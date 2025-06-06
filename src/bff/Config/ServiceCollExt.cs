using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using Dyvenix.Auth.ApiClients;
using Dyvenix.Auth.Core.Config;
using Dyvenix.Bff.Auth;
using Dyvenix.Bff.Services;
using Dyvenix.Common.Api;
using Dyvenix.Common.Api.Config;
using Dyvenix.Core.ApiClients;
using Dyvenix.Logging.Correlation;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using Serilog;
using System;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Yarp.ReverseProxy.Transforms.Builder;

namespace Dyvenix.Bff.Config;

public static partial class ServiceCollExt
{
	#region Auth

	public static void AddAuthServices(this IServiceCollection services, IConfiguration configuration, string uiRootUrl, ILogger logger)
	{
		var authConfig = AuthConfigBuilder.Build(configuration);

		services
			.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
			.AddMicrosoftIdentityWebApp(configuration.GetSection($"AuthConfig:IdPConfig"))
			.EnableTokenAcquisitionToCallDownstreamApi([authConfig.Scope])
			.AddInMemoryTokenCaches();

		services.AddAuthorization();

		services.Configure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options => {
			options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
			options.Cookie.SameSite = SameSiteMode.Strict;
			options.Cookie.HttpOnly = true;
			options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
			options.SlidingExpiration = true;
		});

		services.Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme, options => {
			options.ResponseType = "code";

			options.Scope.Clear();
			options.Scope.Add("openid");
			options.Scope.Add("profile");
			options.Scope.Add(authConfig.Scope);

			options.Events.OnRemoteFailure = context => {
				logger.Error($"OIDC error: {context.Failure}");

				var msg = WebUtility.UrlEncode(context.Failure.Message);

				context.Response.Redirect($"{uiRootUrl}/example?msg={msg}");
				context.HandleResponse(); // Prevent the default redirect
				return Task.CompletedTask;
			};

			options.Events.OnAuthenticationFailed = context => {
				logger.Error($"AUTH ERROR: {context.Exception.Message}");
				return Task.CompletedTask;
			};
		});

		// Registrations 

		services.AddSingleton(authConfig);
		services.AddDistributedMemoryCache();

		services.AddMemoryCache();
		services.AddTransient<IApiTokenProvider, ApiTokenProvider>();
		services.AddTransient<ITransformProvider, ApiTokenTransformProvider>();
	}

	public static IApplicationBuilder UseDyvenixAuth(this IApplicationBuilder app, AuthConfig authConfig)
	{
		if (authConfig.Enabled) {
			app.UseAuthentication(); // resposible for constructing AuthenticationTicket objects representing the user's identity
			app.UseAuthorization();
		}

		return app;
	}

	#endregion

	public static void AddApiClients(this IServiceCollection services, IConfiguration configuration, ILogger logger)
	{
		var apiClientsConfig = ApiClientsConfigBuilder.Build(configuration);

		// Auth
		if (!apiClientsConfig.ContainsKey(AuthConst.ApiId))
			throw new ApplicationException($"Configuration for ApiClient {AuthConst.ApiId} not found.");
		var apiClientConfig = apiClientsConfig[AuthConst.ApiId];
		services.AddTransient<IAccessRolesApiClient>(sp => new AccessRolesApiClient(CreateHttpClient(sp, apiClientConfig)));
		services.AddTransient<ISystemApiClient>(sp => new SystemApiClient(CreateHttpClient(sp, apiClientConfig)));


	}

	private static HttpClient CreateHttpClient(IServiceProvider serviceProvider, ApiClientConfig apiClientConfig)
	{
		var httpClient = serviceProvider.GetRequiredService<HttpClient>();
		httpClient.BaseAddress = new Uri(apiClientConfig.BaseUrl.Trim());
		httpClient.Timeout = TimeSpan.FromSeconds(apiClientConfig.TImeoutSecs);
		return httpClient;
	}

	#region Registrations

	// Registrations
	public static IServiceCollection RegisterServices(this IServiceCollection services, AppConfig appConfig)
	{
		services.AddSingleton(appConfig);
		services.AddScoped<ICorrelationIdAccessor, CorrelationIdAccessor>();
		services.AddScoped<IApiConnectorService, ApiConnectorService>();
		services.AddHttpClient();

		services.AddGeneratedServices();

		return services;
	}

	// Partial method code gen'd registrations
	static partial void AddGeneratedServices(this IServiceCollection services);

	#endregion

	#region Swagger

	public static IServiceCollection AddSwaggerServices(this IServiceCollection services, bool includeAuth)
	{
		services.AddApiVersioning(options => {
			options.ReportApiVersions = true;
			options.AssumeDefaultVersionWhenUnspecified = true;
			options.DefaultApiVersion = new ApiVersion(1, 0);
		})
		.AddApiExplorer(options => {
			options.GroupNameFormat = "'v'V"; // Formats version as "v1"
			options.SubstituteApiVersionInUrl = true;
		});

		// Register Swagger
		services.AddEndpointsApiExplorer();

		var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

		var assyVersion = Assembly.GetExecutingAssembly().GetName().Version;
		services.AddSwaggerGen(options => {
			foreach (var description in provider.ApiVersionDescriptions) {
				options.SwaggerDoc(description.GroupName, new OpenApiInfo {
					Title = $"{Constants.AppName} {description.ApiVersion}",
					Version = description.ApiVersion.ToString(),
					Description = $"Application server for App1 ({assyVersion})"
				});
			}
		});

		return services;
	}

	public static void UseSwaggerServices(this WebApplication app, IServiceCollection services)
	{
		var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

		app.UseSwagger();
		app.UseSwaggerUI(options => {
			foreach (var description in provider.ApiVersionDescriptions) {
				options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", $"Dyvenix {description.ApiVersion}");
			}
		});
	}

	#endregion
}
