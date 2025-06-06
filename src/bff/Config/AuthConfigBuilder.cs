using Microsoft.Extensions.Configuration;
using System;

namespace Dyvenix.Bff.Config;

public static class AuthConfigBuilder
{
	private const string cConfigSectionName = "AuthConfig";

	public static AuthConfig Build(IConfiguration configuration)
	{
		var bffAuthConfig = configuration.GetSection(cConfigSectionName).Get<AuthConfig>();
		if (bffAuthConfig == null)
			throw new ApplicationException($"Unable to retrieve {cConfigSectionName} section from appsettings.json file.");

		return bffAuthConfig;
	}
}
