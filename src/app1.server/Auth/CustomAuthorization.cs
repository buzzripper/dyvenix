using Dyvenix.Auth.Core.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.App1.Server.Auth;

public static class CustomAuthorization
{

	public static void AddCustomAuthorization(this IServiceCollection services, AuthConfig authConfig)
	{
		services.AddAuthorization(options => {
			var scopeName = $"{AuthConst.Scope_Api1_Read}";
			options.AddPolicy("MainPolicy", policy =>
				policy.Requirements.Add(new HasScopeRequirement(scopeName)));
		});

		services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

		// Configure CORS
		services.AddCors(item => {
			item.AddPolicy("CORSPolicy", builder => {
				builder.WithOrigins(authConfig.AllowedOrigins)
				.AllowAnyMethod()
				.AllowAnyHeader();
			});
		});
	}
}
