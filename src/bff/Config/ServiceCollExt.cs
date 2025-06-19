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

		//services.Configure<MicrosoftIdentityOptions>(OpenIdConnectDefaults.AuthenticationScheme, configuration.GetSection("AuthConfig:AzureAd"));

		//services
		//	.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
		//	.AddMicrosoftIdentityWebApp(configuration.GetSection("AuthConfig:AzureAd"), OpenIdConnectDefaults.AuthenticationScheme)
		//	.EnableTokenAcquisitionToCallDownstreamApi(authConfig.Scopes)
		//	.AddInMemoryTokenCaches();

		services
			.AddAuthentication(options => {
				options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;              // Read dyv_auth on each request
				options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;        // Write to dyv_auth after login
				options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;            // Trigger Entra login on [Authorize]
			})
			.AddMicrosoftIdentityWebApp(configuration.GetSection("AuthConfig:AzureAd"))                 // Register OIDC
			.EnableTokenAcquisitionToCallDownstreamApi(authConfig.Scopes)
			.AddInMemoryTokenCaches();


		services.Configure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options => {

			options.Events = new CookieAuthenticationEvents {
				OnValidatePrincipal = context => {
					logger.Information($"[dyv] Cookie validated? {context.Principal?.Identity?.IsAuthenticated}");
					return Task.CompletedTask;
				},

				OnRedirectToLogin = context => {
					if (context.Request.Path.StartsWithSegments("/api") || context.Request.Headers["X-Requested-With"] == "XMLHttpRequest") {
						context.Response.StatusCode = StatusCodes.Status401Unauthorized;
						return Task.CompletedTask;
					}

					context.Response.Redirect(context.RedirectUri);
					return Task.CompletedTask;
				}
			};

			options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
			options.Cookie.SameSite = SameSiteMode.None;
			options.Cookie.Path = "/";
			options.Cookie.Name = "dyv_auth";
			options.Cookie.HttpOnly = true;
			options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
			options.SlidingExpiration = true;
		});

		services.AddAuthorization();

		services.Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme, options => {
			options.ResponseType = "code";
			options.Scope.Clear();
			options.Scope.Add("openid");
			options.Scope.Add("profile");

			options.SaveTokens = true;
			options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

			foreach (var scope in authConfig.Scopes)
				options.Scope.Add(scope);

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

			//options.Events.OnAuthorizationCodeReceived = context => {
			//	var authCode = context.ProtocolMessage.Code;
			//	logger.Information($"AUTH CODE: {authCode}");
			//	return Task.CompletedTask;
			//};

			options.Events.OnTokenValidated = context => {
				var idToken = context.SecurityToken;
				var accessToken = context.TokenEndpointResponse?.AccessToken;
				var refreshToken = context.TokenEndpointResponse?.RefreshToken;

				logger.Information($"ID TOKEN: {idToken}");
				logger.Information($"ACCESS TOKEN: {accessToken}");
				logger.Information($"REFRESH TOKEN: {refreshToken}"); // optional

				return Task.CompletedTask;
			};
		});

		// Registrations 

		services.AddSingleton(authConfig);
		services.AddDistributedMemoryCache();

		services.AddMemoryCache();
		//services.AddTransient<IClientApiTokenProvider, ClientApiTokenProvider>();
		services.AddTransient<ITransformProvider, ApiTokenTransformProvider>();

		services.AddCors(options => {
			options.AddPolicy("CORSPolicy", policy => {
				policy.WithOrigins("https://localhost:7000")
					  .AllowAnyHeader()
					  .AllowAnyMethod()
					  .AllowCredentials();
			});
		});

	}

	//public static IApplicationBuilder UseDyvenixAuth(this IApplicationBuilder app, AuthConfig authConfig)
	//{
	//	if (authConfig.Enabled) {
	//		app.UseAuthentication(); // resposible for constructing AuthenticationTicket objects representing the user's identity
	//		app.UseAuthorization();
	//	}

	//	return app;
	//}

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
