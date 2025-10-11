using Dyvenix.Common.Core;
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

		// Normalize
		foreach (var key in apiClientsConfig.Keys) {
			var clientConfig = apiClientsConfig[key];
			
			if (string.IsNullOrWhiteSpace(clientConfig.BaseUrl))
				throw new ApplicationException($"BaseUrl for ApiClient {key} is not set.");
			
			if (clientConfig.BaseUrl.EndsWith("/"))
				clientConfig.BaseUrl = clientConfig.BaseUrl.TrimEnd('/');

			if (clientConfig.TimeoutSecs <= 0)
				clientConfig.TimeoutSecs = 30; // Default timeout
		}

		return apiClientsConfig;
	}
}
