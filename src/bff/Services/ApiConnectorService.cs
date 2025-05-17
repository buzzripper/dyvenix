using Dyvenix.Bff.Config;
using Dyvenix.Logging;
using System.Collections.Specialized;

namespace Dyvenix.Bff.Services;

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
