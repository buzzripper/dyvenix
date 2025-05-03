using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using Dyvenix.App1.Portal.Config;
using Dyvenix.App1.Portal.Services;
using Dyvenix.Logging.Correlation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace Dyvenix.App1.Server.Config;

public static partial class ServiceCollExt
{
	public static IServiceCollection AddAppServices(this IServiceCollection services, AppConfig appConfig)
	{
		services.AddSingleton(appConfig);
		services.AddScoped<ICorrelationIdAccessor, CorrelationIdAccessor>();
		services.AddScoped<ITestService, TestService>();

		AddGeneratedServices(services);

		return services;
	}

	// Partial method
	static partial void AddGeneratedServices(this IServiceCollection services);

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
		var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

		app.UseSwagger();
		app.UseSwaggerUI(options => {
			foreach (var description in provider.ApiVersionDescriptions) {
				options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", $"Dyvenix {description.ApiVersion}");
			}
		});
	}
}
