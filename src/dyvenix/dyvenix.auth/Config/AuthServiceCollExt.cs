using Dyvenix.Auth.Claims;
using Dyvenix.Auth.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Serilog;
using System;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Config;

public static class AuthServiceCollExt
{
	public static void AddDyvenixAuthServices(this IServiceCollection services, IConfiguration configuration, string uiRootUrl, ILogger logger)
	{
		var authConfig = AuthConfigBuilder.Build(configuration);

		// Configure a BFF

		services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
			.AddMicrosoftIdentityWebApp(configuration.GetSection($"AuthConfig:AzureAdB2C"))
			.EnableTokenAcquisitionToCallDownstreamApi(authConfig.ApiScopes.ToArray())
			.AddInMemoryTokenCaches();

		services.AddAuthorization();

		services.Configure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options => {
			options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
			options.Cookie.SameSite = SameSiteMode.Strict;
			options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
		});

		services.Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme, options => {
			options.ResponseType = "code";
			options.Scope.Clear();
			foreach (var scope in authConfig.OidcScopes)
				options.Scope.Add(scope);
			foreach (var scope in authConfig.ApiScopes)
				options.Scope.Add(scope);

			options.Events.OnRemoteFailure = context => {
				logger.Error($"OIDC error: {context.Failure}");
				context.Response.Redirect($"{uiRootUrl}/pages/error/500");
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
		services.AddSingleton<IAuthorizationPolicyProvider, ClaimPolicyProvider>();
		services.AddScoped<IApiConnectorService, ApiConnectorService>();
	}

	public static IApplicationBuilder UseDyvenixAuth(this IApplicationBuilder app, AuthConfig authConfig)
	{
		if (authConfig.Enabled) {
			app.UseAuthentication(); // resposible for constructing AuthenticationTicket objects representing the user's identity
			app.UseAuthorization();
		}

		return app;
	}
}