using Dyvenix.App1.Data.Config;
using Microsoft.Extensions.Configuration;
using System;

namespace Dyvenix.App1.Server.Config;

public static class DataConfigBuilder
{
	private const string cConfigSectionName = "DataConfig";

	public static DataConfig Build(IConfiguration configuration)
	{
		var dataConfig = configuration.GetSection(cConfigSectionName).Get<DataConfig>();
		if (dataConfig == null)
			throw new ApplicationException($"Unable to retrieve {cConfigSectionName} section from appsettings.json file.");

		return dataConfig;
	}
}
