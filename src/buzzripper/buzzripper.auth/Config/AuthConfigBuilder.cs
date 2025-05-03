using Microsoft.Extensions.Configuration;
using System;

namespace Dyvenix.Auth.Config;

public static class AuthConfigBuilder
{
	private const string cConfigSectionName = "AuthConfig";

	public static AuthConfig Build(IConfiguration configuration)
	{
		var authConfig = configuration.GetSection(cConfigSectionName).Get<AuthConfig>();
		if (authConfig == null)
			throw new ApplicationException($"Unable to retrieve {cConfigSectionName} section from appsettings.json file.");

		return authConfig;
	}
}
