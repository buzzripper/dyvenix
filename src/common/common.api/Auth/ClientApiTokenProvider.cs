//using Dyvenix.Auth.Core.Models;
//using Microsoft.Extensions.Caching.Memory;
//using System;
//using System.Text.Json;
//using System.Threading.Tasks;
//using System.Text.Json.Serialization;
//using Azure.Core;
//using Dyvenix.Common.Api.Config;

//namespace Dyvenix.Common.Api.Auth;

//public interface IClientApiTokenProvider
//{
//	Task<ApiToken> GetApiToken(string id);
//	Task<string> GetApiTokenJson(string id);
//}

//public abstract class ClientApiTokenProvider
//{
//	#region Static

//	protected static readonly JsonSerializerOptions JsonSerializerOptions = new JsonSerializerOptions {
//		DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
//		PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//		PropertyNameCaseInsensitive = true
//	};

//	#endregion

//	private readonly IMemoryCache _cache;
//	private readonly AuthConfig _authConfig;
//	private readonly IOAuthTokenProvider _oAuthTokenProvider;

//	#region Ctors / Init

//	public ClientApiTokenProvider(IMemoryCache cache, AuthConfig authConfig, IOAuthTokenProvider oAuthTokenProvider)
//	{
//		_cache = cache;
//		_authConfig = authConfig;
//		_oAuthTokenProvider = oAuthTokenProvider;
//	}

//	#endregion

//	public async Task<string> GetApiTokenJson(string id)
//	{
//		var apiToken = await GetApiToken(id);
//		return JsonSerializer.Serialize(apiToken, JsonSerializerOptions);
//	}

//	public async Task<ApiToken> GetApiToken(string id)
//	{
//		if (string.IsNullOrEmpty(id))
//			throw new ArgumentNullException(nameof(id));

//		var cacheKey = $"{CacheId.ApiToken}:{ApiTokenClientType.Client}:{id}";

//		if (!_cache.TryGetValue(cacheKey, out ApiToken accessToken)) {

//			var apiToken = await BuildToken(id);

//			_cache.Set(cacheKey, accessToken, new MemoryCacheEntryOptions {
//				SlidingExpiration = TimeSpan.FromMinutes(30)
//			});
//		}

//		return accessToken;
//	}

//	protected virtual async Task<ApiToken> BuildToken(string id)
//	{
//		return new ApiToken {
//			ClientType = ApiTokenClientType.Client,
//			ClientId = id,
//			Roles = [SysRoles.Api]
//		};
//	}
//}
