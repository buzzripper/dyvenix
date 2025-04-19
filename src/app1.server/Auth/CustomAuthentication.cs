using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.App1.Server.Auth;

public static class CustomAuthentication
{
	public static AuthenticationBuilder AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
	{
		var builder = services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);

		return builder;
	}
}
