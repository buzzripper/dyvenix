using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using Dyvenix.Auth.Core.Config;
using Dyvenix.Bff.Auth;
using Dyvenix.Common.Api;
using Dyvenix.Common.Api.Config;
using Dyvenix.Logging.Correlation;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.TokenCacheProviders.InMemory;
using Microsoft.OpenApi.Models;
using Serilog;
using System;
using System.Net;
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

		services.AddAuthentication(options => {
			options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
		})
		.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {
			options.Cookie.Name = "dyv_auth";
			options.Cookie.HttpOnly = true;
			options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
			options.Cookie.SameSite = SameSiteMode.None;
			options.Cookie.Path = "/";
			options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
			options.SlidingExpiration = true;

			options.Events = new CookieAuthenticationEvents {
				OnRedirectToLogin = context => {
					if (context.Request.Path.StartsWithSegments("/auth") ||
						context.Request.Path.StartsWithSegments("/api") ||
						context.Request.Headers["X-Requested-With"] == "XMLHttpRequest") {
						context.Response.StatusCode = StatusCodes.Status401Unauthorized;
						return Task.CompletedTask;
					}

					context.Response.Redirect(context.RedirectUri);
					return Task.CompletedTask;
				}
			};
		})
		.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options => {
			configuration.Bind("AuthConfig:AzureAd", options);

			options.Authority = $"{configuration["AuthConfig:AzureAd:Instance"]}{configuration["AuthConfig:AzureAd:TenantId"]}/v2.0/";
			options.ClientId = configuration["AuthConfig:AzureAd:ClientId"];
			options.ClientSecret = configuration["AuthConfig:AzureAd:ClientSecret"];
			options.ResponseType = "code";
			options.SaveTokens = true;
			options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

			options.Scope.Clear();
			options.Scope.Add("openid");
			options.Scope.Add("profile");

			foreach (var scope in authConfig.Scopes)
				options.Scope.Add(scope);

			options.Events = new OpenIdConnectEvents {
				OnRemoteFailure = context => {
					logger.Error($"OIDC error: {context.Failure}");
					var msg = WebUtility.UrlEncode(context.Failure?.Message ?? "Unknown");
					context.Response.Redirect($"{uiRootUrl}/example?msg={msg}");
					context.HandleResponse();
					return Task.CompletedTask;
				},
				OnAuthenticationFailed = context => {
					logger.Error($"AUTH ERROR: {context.Exception.Message}");
					return Task.CompletedTask;
				},
				OnTokenValidated = context => {
					logger.Information($"ID TOKEN: {context.SecurityToken}");
					logger.Information($"ACCESS TOKEN: {context.TokenEndpointResponse?.AccessToken}");
					return Task.CompletedTask;
				}
			};
		});

		services.AddTokenAcquisition();
		services.AddInMemoryTokenCaches();

		services.AddAuthorization();

		services.AddDistributedMemoryCache();
		services.AddMemoryCache();
		services.AddSingleton(authConfig);

		services.AddCors(options => {
			options.AddPolicy("CORSPolicy", policy => {
				policy.WithOrigins("https://localhost:4200")
					  .AllowAnyHeader()
					  .AllowAnyMethod()
					  .AllowCredentials();
			});
		});
	}


	#endregion

	//public static void AddApiClients(this IServiceCollection services, IConfiguration configuration, ILogger logger)
	//{
	//	var apiClientsConfig = ApiClientsConfigBuilder.Build(configuration);

	//	// Auth
	//	if (!apiClientsConfig.ContainsKey(AuthConst.ApiId))
	//		throw new ApplicationException($"Configuration for ApiClient {AuthConst.ApiId} not found.");
	//	services.AddAuthApiClients(apiClientsConfig[AuthConst.ApiId]);
	//}


	#region Registrations

	// Registrations
	public static IServiceCollection RegisterServices(this IServiceCollection services, AppConfig appConfig)
	{
		services.AddSingleton(appConfig);
		services.AddScoped<ICorrelationIdAccessor, CorrelationIdAccessor>();
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
