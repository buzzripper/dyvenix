using Dyvenix.Auth.Core.Services;
using Dyvenix.Auth.Core.SvcClients;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.Auth.Core.Config;

public static class AuthServiceCollExt
{
	public static void AddDyvenixAuthServices(this IServiceCollection services, AuthConfig authConfig)
	{
		services.AddSingleton(authConfig);
		services.AddSingleton(authConfig.B2CConfig);
		services.AddDistributedMemoryCache();
		services.AddScoped<IAuthSessionService, AuthSessionService>();
		services.AddScoped<IB2CSvcClient, B2CSvcClient>();
		services.AddScoped<IAuthorizationService, AuthorizationService>();
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