using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Threading.Tasks;

namespace Dyvenix.Common.Api.Config;

public static class ServiceCollExt
{
	public static void AddApiAuth(this IServiceCollection services, WebApplicationBuilder builder, AuthConfig authConfig, ILogger logger)
	{
		if (!authConfig.Enabled) {
			logger.Warning("Authentication is disabled. No authentication will be performed.");
			return;
		}

		builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(options => {
				builder.Configuration.Bind("JwtBearer", options);

				options.TokenValidationParameters = new TokenValidationParameters {
					ValidateAudience = true,
					ValidAudience = builder.Configuration["JwtBearer:Audience"],
					ValidateIssuer = true,
					ValidIssuer = builder.Configuration["JwtBearer:Authority"],

					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
				};

				// Optional logging/debug
				options.Events = new JwtBearerEvents {
					OnAuthenticationFailed = context => {
						Console.WriteLine($"Auth failed: {context.Exception.Message}");
						return Task.CompletedTask;
					}
				};
			});

		builder.Services.AddAuthorization(options => {
			options.AddPolicy("RequireAppAccess", policy => {
				policy.RequireAuthenticatedUser();
				policy.RequireClaim("roles", "app.user", "partner.integrator", "admin");
			});

			// Optional: Allow clients with certain roles only
			options.AddPolicy("ClientOnly", policy => {
				policy.RequireAuthenticatedUser();
				policy.RequireClaim("client_id");
				policy.RequireAssertion(ctx =>
					ctx.User.HasClaim(c => c.Type == "roles" && c.Value.Contains("partner.integrator")));
			});
		});
	}
}