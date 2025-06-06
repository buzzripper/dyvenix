using Microsoft.Extensions.Configuration;
using System;

namespace Dyvenix.Common.Api.Config;

public static class ApiClientsConfigBuilder
{
	private const string cConfigSectionName = "ApiClients";

	public static ApiClientsConfig Build(IConfiguration configuration)
	{
		var apiClientsConfig = configuration.GetSection(cConfigSectionName).Get<ApiClientsConfig>();
		if (apiClientsConfig == null)
			throw new ApplicationException($"Unable to retrieve {cConfigSectionName} section from appsettings.json file.");

		return apiClientsConfig;
	}
}
