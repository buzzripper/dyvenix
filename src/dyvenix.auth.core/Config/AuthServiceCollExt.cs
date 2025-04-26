using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Serilog;
using Dyvenix.Auth.Core.Services;

namespace Dyvenix.Auth.Core.Config;

public static class AuthServiceCollExt
{
	public static void AddDyvenixAuthServices(this IServiceCollection services, WebApplicationBuilder builder, string uiRootUrl, ILogger logger)
	{
		var authConfig = AuthConfigBuilder.Build(builder.Configuration);

		// BFF

		services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
			.AddMicrosoftIdentityWebApp(builder.Configuration.GetSection($"AuthConfig:AzureAdB2C"))
			.EnableTokenAcquisitionToCallDownstreamApi()
			.AddInMemoryTokenCaches();

		builder.Services.AddAuthorization();

		builder.Services.Configure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options => {
			options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
			options.Cookie.SameSite = SameSiteMode.Strict;
			options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
		});

		builder.Services.Configure<OpenIdConnectOptions>(
			OpenIdConnectDefaults.AuthenticationScheme,
			options => {
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

				options.Events.OnTokenValidated = context => {
					logger.Error("Token validated for: " + context.Principal.Identity.Name);
					return Task.CompletedTask;
				};
			}
		);

		// Registrations 

		services.AddSingleton(authConfig);
		services.AddDistributedMemoryCache();
		services.AddScoped<IAuthSessionService, AuthSessionService>();
	}

	public static IApplicationBuilder UseDyvenixAuth(this IApplicationBuilder app, AuthConfig authConfig)
	{
		if (authConfig.Enabled) {
			app.UseAuthentication(); // resposible for constructing AuthenticationTicket objects representing the user's identity
			app.UseAuthorization();

		} else {
			//app.MapControllers().AllowAnonymous();
		}

		return app;
	}
}