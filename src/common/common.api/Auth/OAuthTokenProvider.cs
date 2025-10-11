//using Dyvenix.Common.Api.Config;
//using Microsoft.Extensions.Caching.Memory;
//using Microsoft.Identity.Client;
//using System;
//using System.Threading.Tasks;

//namespace Dyvenix.Common.Api.Auth;

//public interface IOAuthTokenProvider
//{
//	Task<string> GetAccessToken();
//}

//public class OAuthTokenProvider : IOAuthTokenProvider
//{
//	private static string cCacheKey = CacheId.OAuthToken.ToString();

//	private readonly IConfidentialClientApplication _confidentialClientApplication;
//	private readonly AuthConfig _authConfig;
//	private readonly IMemoryCache _cache;

//	public OAuthTokenProvider(IConfidentialClientApplication confidentialClientApplication, AuthConfig authConfig, IMemoryCache cache)
//	{
//		_confidentialClientApplication = confidentialClientApplication;
//		_authConfig = authConfig;
//		_cache = cache;
//	}

//	public async Task<string> GetAccessToken()
//	{
//		if (_cache.TryGetValue(cCacheKey, out string token))
//			return token;

//		var authResult = await _confidentialClientApplication.AcquireTokenForClient(_authConfig.Scopes).ExecuteAsync();

//		var expiration = authResult.ExpiresOn.UtcDateTime - DateTime.UtcNow;

//		// If token is too close to expiring then don't cache it
//		if (expiration <= TimeSpan.FromMinutes(1))
//			return authResult.AccessToken;

//		// Cache it
//		var cacheEntryOptions = new MemoryCacheEntryOptions { AbsoluteExpirationRelativeToNow = expiration - TimeSpan.FromMinutes(1) }; // 1 min buffer to avoid expiry
//		_cache.Set(cCacheKey, authResult.AccessToken, cacheEntryOptions);

//		return authResult.AccessToken;
//	}
//}
