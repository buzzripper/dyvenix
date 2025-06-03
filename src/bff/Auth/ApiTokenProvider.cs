using Dyvenix.Auth.Core.Models;
using Dyvenix.Bff.Config;
using Dyvenix.Core.DTOs;
using Dyvenix.Core.Exceptions;
using Dyvenix.Logging;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Azure.Core;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;
using System.Data;
using Dyvenix.Common.Api.Auth;
using Microsoft.AspNetCore.Http;
using Dyvenix.Auth.Core;
using Microsoft.Identity.Client;

namespace Dyvenix.Bff.Auth;

public interface IApiTokenProvider
{
	Task<string> GetAccessClaimsForUserAsync(string apiId, string userId);
}

public class ApiTokenProvider : IApiTokenProvider
{
	private static string ClientCredAccessToken;
	private static string SysRoleAccessToken;
	private static readonly JsonSerializerOptions JsonSerializerOptions = new JsonSerializerOptions {
		DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
		PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
		PropertyNameCaseInsensitive = true
	};

	static ApiTokenProvider()
	{
		var accessToken = new DyvAccessToken {
			CallerType = 1,
			CallerId = Guid.NewGuid().ToString(),
			Roles = new List<string> { SysRoles.Sys }
		};
		SysRoleAccessToken = JsonSerializer.Serialize(accessToken, JsonSerializerOptions);
	}

	private readonly IMemoryCache _cache;
	private readonly AuthConfig _authConfig;
	private readonly HttpClient _httpClient;

	public ApiTokenProvider(IMemoryCache cache, AuthConfig authConfig, HttpClient httpClient)
	{
		_cache = cache;
		_authConfig = authConfig;
		_httpClient = httpClient;
	}

	public async Task<string> GetAccessClaimsForUserAsync(string apiId, string userId)
	{
		if (string.IsNullOrEmpty(apiId))
			throw new ArgumentNullException(nameof(apiId));

		if (string.IsNullOrEmpty(userId))
			throw new ArgumentNullException(nameof(userId));

		var cacheKey = $"roles:{apiId}_{userId}";

		if (!_cache.TryGetValue(cacheKey, out DyvAccessToken accessToken)) {
			var roles = await GetAccessRoles(apiId, userId);

			accessToken = new DyvAccessToken {
				CallerType = 1,
				CallerId = userId,
				Roles = roles
			};

			_cache.Set(cacheKey, accessToken, new MemoryCacheEntryOptions {
				SlidingExpiration = TimeSpan.FromMinutes(30)
			});
		}

		return JsonSerializer.Serialize(accessToken);
	}

	private async Task<List<string>> GetAccessRoles(string apiId, string userId)
	{
		//if (!_authConfig.ApiRolesEndpoints.TryGetValue(apiId, out var endpoint))
		//	throw new ApplicationException($"ApiId '{apiId}' does not have a configured roles endpoint.");

		//var endpointUrl = $"{endpoint}/{userId}";

		// TODO: Use api client or whatever
		var endpointUrl = $"https://localhost:7001/api/v1/accessroles/getaccessrolesforuser/{userId}";

		_httpClient.DefaultRequestHeaders.Clear();

		// Add client_credentials access token
		if (string.IsNullOrEmpty(ClientCredAccessToken))
			ClientCredAccessToken = await GetBFFAcessToken();
		_httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {ClientCredAccessToken}");

		// Add our custom access token
		_httpClient.DefaultRequestHeaders.Add(AuthConst.TokenHeaderName, SysRoleAccessToken);

		var httpResponse = await _httpClient.GetAsync(endpointUrl);

		if (!httpResponse.IsSuccessStatusCode)
			throw new ApplicationException($"Failed attempt to get roles for user {userId} from ApiId {apiId}: {httpResponse.StatusCode} - {httpResponse.ReasonPhrase}");

		if (httpResponse.StatusCode == HttpStatusCode.NoContent)
			return default;

		var responseString = await httpResponse.Content.ReadAsStringAsync();

		try {
			return JsonSerializer.Deserialize<List<string>>(responseString, JsonSerializerOptions);

		} catch (Exception ex) {
			throw new ApplicationException($"{ex.GetType().Name} attempting to deserialize roles for user {userId} returned from api {apiId}", ex);
		}
	}

	private async Task<string> GetBFFAcessToken()
	{
		var app = ConfidentialClientApplicationBuilder
			.Create(_authConfig.AzureAd.ClientId)
			.WithClientSecret(_authConfig.AzureAd.ClientSecret)
			.WithAuthority(new Uri($"{_authConfig.AzureAd.Instance}{_authConfig.AzureAd.TenantId}"))
			.Build();

		//var result = await app.AcquireTokenForClient(new[] { "api://af02ac5b-78db-42cb-b39d-081d1a793d32/.default" }).ExecuteAsync();
		var result = await app.AcquireTokenForClient(new[] { "https://dyvenix.com/app/.default" }).ExecuteAsync();

		var accessToken = result.AccessToken;

		return accessToken;
	}
}
