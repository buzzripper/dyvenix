using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Dyvenix.Logging.Config;

public static class ServiceCollectionExtensions
{
	public static void AddDyvenixLoggingServices(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddSerilog();
		services.AddScoped(typeof(IDyvenixLogger<>), typeof(DyvenixLogger<>));

		//services.AddSingleton<ILogger>(provider => {
		//	return logger;
		//});
	}
}