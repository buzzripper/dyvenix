using Dyvenix.Common.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.Common.Data.Config;

public static class DataSvcCollExt
{
	public static void AddDyvenixDataServices(this IServiceCollection services, DataConfig dataConfig)
	{
		services.AddSingleton(dataConfig);

		services.AddSingleton(sp => {
			var b = new DbContextOptionsBuilder<Db>();
			b.UseSqlServer(dataConfig.ConnectionString);
			return b.Options;
		});

		services.AddSingleton<IDbContextFactory, DbContextFactory>();
	}
}