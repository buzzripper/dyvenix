using System.Collections.Specialized;
using Microsoft.AspNetCore.Mvc;
using Dyvenix.Auth.Models;
using Microsoft.AspNetCore.Http;
using System.Text;
using System;
using Azure.Core;
using Dyvenix.Auth.Config;
using Dyvenix.Auth.Controllers;
using Dyvenix.Logging;

namespace Dyvenix.Auth.Services;

public interface IApiConnectorService
{
	NameValueCollection GetExtClaims(string extUserId);
}

public class ApiConnectorService : IApiConnectorService
{
	private readonly AuthConfig _authConfig;
	private readonly IDyvenixLogger<ApiConnectorService> _logger;

	public ApiConnectorService(AuthConfig authConfig, IDyvenixLogger<ApiConnectorService> logger)
	{
		_authConfig = authConfig;
		_logger = logger;
	}

	public NameValueCollection GetExtClaims(string extUserId)
	{
		var nameValColl = new NameValueCollection();

		nameValColl.Add("MyCustomClaim", "TheDudeAbides");
		nameValColl.Add("OtherCustomClaim", "Super important info");

		return nameValColl;
	}
}
