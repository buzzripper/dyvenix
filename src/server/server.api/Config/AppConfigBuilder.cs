﻿using Microsoft.Extensions.Configuration;
using System;

namespace Dyvenix.Server.Api.Config;

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

	public static string ObfuscateDbConnStr(string dbConnectionString)
	{
		const string cPwdToken = "password";
		var pwdLength = cPwdToken.Length;

		if (string.IsNullOrWhiteSpace(dbConnectionString))
			return dbConnectionString;

		var p1 = dbConnectionString.IndexOf(cPwdToken, StringComparison.InvariantCultureIgnoreCase);
		if (p1 == -1)
			return dbConnectionString;

		var p2 = dbConnectionString.IndexOf("=", p1 + pwdLength);
		if (p2 == -1)
			return dbConnectionString;

		var p3 = dbConnectionString.IndexOf(";", p2 + 1);

		var password = p3 == -1 ? dbConnectionString.Substring(p2 + 1) : dbConnectionString.Substring(p2 + 1, p3 - (p2 + 1));

		password = password.Trim();
		if (password.Length == 0)
			return dbConnectionString;

		return dbConnectionString.Replace(password, "****");
	}
}
