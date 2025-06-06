using Microsoft.Identity.Client;
using System;
using System.Threading.Tasks;

namespace Dyvenix.Common.Api.Auth;

public interface IClientCredsTokenProvider
{

}

public class OAuthTokenProvider
{
	private readonly IConfidentialClientApplication _confidentialClientApplication;
	private readonly AuthConfig _authConfig;

	public OAuthTokenProvider(IConfidentialClientApplication confidentialClientApplication, AuthConfig authConfig)
	{
		_confidentialClientApplication = confidentialClientApplication;
		_authConfig = authConfig;
	}

	public async Task<string> GetClientCredsToken()
	{


		//var result = await app.AcquireTokenForClient(new[] { "api://af02ac5b-78db-42cb-b39d-081d1a793d32/.default" }).ExecuteAsync();
		var result = await app.AcquireTokenForClient(new[] { "https://dyvenix.com/app/.default" }).ExecuteAsync();

		var accessToken = result.AccessToken;

		return accessToken;
	}
}
