using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;

namespace Dyvenix.App1.Common.Config;

public static partial class ApiClientCollExt
{
	public static void AddApiClientServices(this IServiceCollection services, ApiClientConfig apiClientConfig)
	{
		services.AddSingleton(apiClientConfig);

		services.AddTransient<HttpClient>(sp => { 
			var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
			var httpClient = httpClientFactory.CreateClient();
			httpClient.BaseAddress = new Uri(apiClientConfig.BaseUrl.Trim());
			return httpClient;
		});

		AddGeneratedApiClients(services, apiClientConfig);
	}

	static partial void AddGeneratedApiClients(this IServiceCollection services, ApiClientConfig apiClientConfig);
}