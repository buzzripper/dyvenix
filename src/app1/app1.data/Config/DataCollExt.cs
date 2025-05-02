using Dyvenix.App1.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.App1.Data.Config;

public static class DataCollExt
{
	public static void AddDyvenixDataServices(this IServiceCollection services, DataConfig dataConfig)
	{
		services.AddSingleton(dataConfig);

		services.AddSingleton<DbContextOptions<Db>>(sp => {
			var b = new DbContextOptionsBuilder<Db>();
			b.UseSqlServer(dataConfig.ConnectionString);
			return b.Options;
		});

		services.AddSingleton<IDbContextFactory, DbContextFactory>();
	}
}