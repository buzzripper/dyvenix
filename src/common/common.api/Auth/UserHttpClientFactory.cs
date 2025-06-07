using Dyvenix.Common.Core;
using Dyvenix.Logging;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Dyvenix.Common.Api.Auth;

public interface IUserHttpClientFactory
{
	Task<HttpClient> CreateHttpClient(string baseUrl, int timeoutSecs);
}

// Singleton
public class UserHttpClientFactory
{
	private readonly IHttpClientFactory _httpClientFactory;
	private readonly IOAuthTokenProvider _oAuthTokenProvider;
	private readonly IUserApiTokenProvider _userApiTokenProvider;
	private readonly IDyvenixLogger<UserHttpClientFactory> _logger;

	private readonly string _baseUrl;

	public UserHttpClientFactory(IHttpClientFactory httpClientFactory, IOAuthTokenProvider oAuthTokenProvider, IUserApiTokenProvider userApiTokenProvider, IDyvenixLogger<UserHttpClientFactory> logger)
	{
		_httpClientFactory = httpClientFactory;
		_oAuthTokenProvider = oAuthTokenProvider;
		_userApiTokenProvider = userApiTokenProvider;
		_logger = logger;
	}

	public async Task<HttpClient> CreateHttpClient(string baseUrl, int timeoutSecs)
	{
		var httpClient = _httpClientFactory.CreateClient();
		httpClient.BaseAddress = new Uri(baseUrl);
		httpClient.Timeout = TimeSpan.FromSeconds(timeoutSecs);

		var oauthToken = await _oAuthTokenProvider.GetAccessToken();
		if (!string.IsNullOrEmpty(oauthToken)) {
			httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", oauthToken);
		} else {
			_logger.Warn($"OAuth token is null or empty for API client: {baseUrl}");
		}

		var apiToken = await _userApiTokenProvider.GetApiToken();
		if (!string.IsNullOrEmpty(apiToken)) {
			httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiToken);
		}

		return httpClient;
	}
}
