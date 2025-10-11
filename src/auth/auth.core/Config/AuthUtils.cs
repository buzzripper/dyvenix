using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using Dyvenix.Common.Core;

namespace Dyvenix.Auth.Core;

public static class AuthUtils
{
	public static HttpClient CreateHttpClient(IServiceProvider serviceProvider, ApiClientConfig apiClientConfig)
	{
		var httpClient = serviceProvider.GetRequiredService<HttpClient>();
		httpClient.BaseAddress = new Uri(apiClientConfig.BaseUrl.Trim());
		httpClient.Timeout = TimeSpan.FromSeconds(apiClientConfig.TimeoutSecs);
		return httpClient;
	}
}
