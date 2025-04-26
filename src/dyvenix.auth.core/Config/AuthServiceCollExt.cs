using Dyvenix.Auth.Core.Services;
using Dyvenix.Auth.Core.SvcClients;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using System;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core.Config;

public static class AuthServiceCollExt
{
	public static void AddDyvenixAuthServices(this IServiceCollection services, WebApplicationBuilder builder, AuthConfig authConfig)
	{
		// BFF

		services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
			.AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("ApplicationConfig:AuthConfig:AzureAdB2C"))
			.EnableTokenAcquisitionToCallDownstreamApi()
			.AddInMemoryTokenCaches();

		//builder.Services.AddAuthorization(options => {
		//	options.FallbackPolicy = options.DefaultPolicy;
		//});

		//builder.Services.AddAuthorization(options => {
		//	options.FallbackPolicy = new AuthorizationPolicyBuilder()
		//		.RequireAuthenticatedUser()
		//		.Build();
		//});

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
					Console.WriteLine($"OIDC ERROR: {context.Failure}");

					context.Response.Redirect("/pages/error/500");
					context.HandleResponse(); // Prevent the default redirect
					return Task.CompletedTask;
				};
				options.Events.OnAuthenticationFailed = context => {
					Console.WriteLine($"AUTH ERROR: {context.Exception.Message}");
					return Task.CompletedTask;
				};

				options.Events.OnTokenValidated = context => {
					Console.WriteLine("Token validated for: " + context.Principal.Identity.Name);
					return Task.CompletedTask;
				};
			}
		);

		// Registrations 

		services.AddSingleton(authConfig);
		//services.AddSingleton(authConfig.B2CConfig);
		services.AddDistributedMemoryCache();
		services.AddScoped<IAuthSessionService, AuthSessionService>();
		//services.AddScoped<IB2CSvcClient, B2CSvcClient>();
		//services.AddScoped<IAuthorizationService, AuthorizationService>();
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