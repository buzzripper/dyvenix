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
using System.Linq;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;
using Microsoft.Extensions.Configuration;
using Dyvenix.Auth.Core.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Dyvenix.Auth.Core.Config;

public static class AuthServiceCollExt
{
	//private static string[] Scopes = [
	//						"openid",
	//						"profile",
	//						"offline_access",
	//						"https://pdtenant1.onmicrosoft.com/c24a1563-3cff-4ee2-a3e7-84469c8b770e/User",
	//						"https://pdtenant1.onmicrosoft.com/c24a1563-3cff-4ee2-a3e7-84469c8b770e/user.admin"
	//					];

	//private static string[] OidcScopes = [
	//	"openid",
	//	"profile",
	//	"offline_access"
	//];

	//private static string[] ApiScopes = [
	//	"https://pdtenant1.onmicrosoft.com/c24a1563-3cff-4ee2-a3e7-84469c8b770e/User",
	//	"https://pdtenant1.onmicrosoft.com/c24a1563-3cff-4ee2-a3e7-84469c8b770e/user.admin"
	//];

	public static void AddDyvenixAuthServices(this IServiceCollection services, IConfiguration configuration, string uiRootUrl, ILogger logger)
	{
		var authConfig = AuthConfigBuilder.Build(configuration);

		// BFF

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

			//options.Events.OnAuthorizationCodeReceived = async context => {
			//	var tokenAcquisition = context.HttpContext.RequestServices.GetRequiredService<ITokenAcquisition>();
			//	var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(authConfig.ApiScopes, user: context.Principal);
			//	Console.WriteLine(accessToken);
			//};


			//options.Events.OnTokenValidated = context => {
			//	logger.Error("Token validated for: " + context.Principal.Identity.Name);
			//	return Task.CompletedTask;
			//};


			//options.Events.OnTokenValidated = async context => {

			//	var tokenAcquisition = context.HttpContext.RequestServices.GetRequiredService<ITokenAcquisition>();

			//	//var authenticationResult = await tokenAcquisition.GetAuthenticationResultForUserAsync(authConfig.ApiScopes, tenantId: null, userFlow: null, user: context.Principal);
			//	//if (authenticationResult == null) {
			//	//	logger.Error("Authentication result is null.");
			//	//	return;
			//	//}

			//	//foreach (var claim in context.Principal.Claims) {
			//	//	logger.Debug($"{claim.Type} = {claim.Value}");
			//	//}
			//	//var userFlow = context.Principal?.Claims.FirstOrDefault(c => c.Type == "tfp")?.Value;
			//	//var tenantId = "92e8289a-6dc8-477a-9a96-2d611de8a393";

			//	var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(authConfig.ApiScopes, user: context.Principal, userFlow: authConfig.AzureAdB2C.SignUpSignInPolicyId);
			//};

		});

		services.Configure<MicrosoftIdentityOptions>(options => {
			options.TokenValidationParameters.AuthenticationType = "oidc";
			// 👇 Add this to tell it: use "sub" as the user ID
			options.TokenValidationParameters.NameClaimType = "sub";
		});

		// Registrations 

		services.AddSingleton(authConfig);
		services.AddDistributedMemoryCache();
		services.AddScoped<IAuthSessionService, AuthSessionService>();
		services.AddSingleton<IAuthorizationPolicyProvider, ClaimPolicyProvider>();
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