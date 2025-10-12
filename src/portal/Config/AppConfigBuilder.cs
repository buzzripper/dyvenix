using Microsoft.Extensions.Configuration;
using System;

namespace Dyvenix.Portal.Config;

public static class AppConfigBuilder
{
	private const string cConfigSectionName = "AppConfig";

	public static AppConfig Build(IConfiguration configuration)
	{
		var appConfig = configuration.GetSection(cConfigSectionName).Get<AppConfig>();
		if (appConfig == null)
			throw new ApplicationException($"Unable to retrieve {cConfigSectionName} section from appsettings.json file.");

		return appConfig;
	}
}
