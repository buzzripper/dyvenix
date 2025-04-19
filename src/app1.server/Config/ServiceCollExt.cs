using Asp.Versioning.ApiExplorer;
using Asp.Versioning;
using Dyvenix.App1.Server.Auth;
using Dyvenix.App1.Server.Services;
using Dyvenix.Auth.Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Reflection;
using Microsoft.OpenApi.Any;
using System;
using Dyvenix.Logging.Correlation;

namespace Dyvenix.App1.Server.Config;

public static partial class ServiceCollExt
{
	public static IServiceCollection AddAppServices(this IServiceCollection services, AppConfig appConfig)
	{
		services.AddSingleton(appConfig);
		services.AddScoped<ICorrelationIdAccessor, CorrelationIdAccessor>();
		services.AddScoped<ITestService, TestService>();
		services.AddScoped<IAccessClaimsProvider, AccessClaimsProvider>();

		AddGeneratedServices(services);

		return services;
	}

	// Partial method
	static partial void AddGeneratedServices(this IServiceCollection services);

	public static IServiceCollection AddSwaggerServices(this IServiceCollection services, bool includeAuth)
	{
		var assyVersion = Assembly.GetExecutingAssembly().GetName().Version;

		services.AddApiVersioning(options => {
			options.ReportApiVersions = true;
			options.AssumeDefaultVersionWhenUnspecified = true;
			options.DefaultApiVersion = new ApiVersion(1, 0);
		})
		.AddApiExplorer(options => {
			options.GroupNameFormat = "'v'VVV"; // Formats version as "v1"
			options.SubstituteApiVersionInUrl = true;
		});

		// Register Swagger
		services.AddEndpointsApiExplorer();

		services.AddSwaggerGen(options => {
			var provider = services.BuildServiceProvider()
							 .GetRequiredService<IApiVersionDescriptionProvider>();

			foreach (var description in provider.ApiVersionDescriptions) {
				options.SwaggerDoc(description.GroupName, new OpenApiInfo {
					Title = $"{ConfigConst.AppDisplayName} {description.ApiVersion}",
					Version = description.ApiVersion.ToString(),
					Description = $"Application server for App1 ({assyVersion})"
				});
			}
		});

		return services;
	}

	public static void UseSwaggerServices(this WebApplication app, IServiceCollection services)
	{
		app.UseSwagger();
		app.UseSwaggerUI(options => {
			var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
			foreach (var description in provider.ApiVersionDescriptions) {
				options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", $"My API {description.ApiVersion}");
			}
		});
	}
}
