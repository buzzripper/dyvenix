using Dyvenix.Auth.Core.Models;
using Dyvenix.Auth.Core.SvcClients;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core.Services;

public interface IAuthSessionService
{
	Task<string> StartSession(string authCode, string codeVerifier);
}

public class AuthSessionService : IAuthSessionService
{
	private readonly IB2CSvcClient _b2cSvcClient;
	private readonly IDistributedCache _cache;
	private readonly IAccessClaimsProvider _accessClaimsProvider;

	public AuthSessionService(IB2CSvcClient b2cSvcClient, IDistributedCache cache, IAccessClaimsProvider accessClaimsProvider)
	{
		_b2cSvcClient = b2cSvcClient;
		_cache = cache;
		_accessClaimsProvider = accessClaimsProvider;
	}

	public async Task<string> StartSession(string authCode, string codeVerifier)
	{
		var tokenFromAuthCodeResponse = await _b2cSvcClient.GetTokenFromAuthCode(authCode, codeVerifier);

		//var idToken = JsonSerializer.Deserialize<IdToken>(tokenFromAuthCodeResponse.IdToken);

		var handler = new JwtSecurityTokenHandler();
        var jwtDecoded = handler.ReadToken(tokenFromAuthCodeResponse.IdToken) as JwtSecurityToken;

		var identityId = jwtDecoded.Subject;

		var refreshToken = tokenFromAuthCodeResponse.RefreshToken;

		var userExtId = GetIdToken(tokenFromAuthCodeResponse.IdToken);
		if (string.IsNullOrEmpty(userExtId))
			throw new ApplicationException("UserExtId is null or empty");

		// Create a new session and store in cache
		var sessionId = Guid.NewGuid().ToString();
		var accessToken = string.Empty;  // TO DO
										 //await _cache.SetStringAsync(sessionId, accessToken, new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(tokenResponse.RefreshTokenExpiresInSecs) });
		return sessionId;
	}

	private string GetIdToken(string idTokenStr)
	{
		return null;
	}
}

