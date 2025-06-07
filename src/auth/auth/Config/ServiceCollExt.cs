using Dyvenix.Auth.ApiClients;
using Dyvenix.Common.Api.Auth;
using Dyvenix.Common.Core;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.Auth.Config;

public static class ServiceCollExt
{
	public async static void AddAuthApiClients(this IServiceCollection services, ApiClientConfig apiClientConfig)
	{
		services.AddTransient<IAccessRolesApiClient>(sp => async () { 
			var userHttpClientFactory = sp.GetRequiredService<IUserHttpClientFactory>();
			var httpClient = await userHttpClientFactory.CreateHttpClient(apiClientConfig.BaseUrl, apiClientConfig.TimeoutSecs);
			return new AccessRolesApiClient(httpClient);
		});

		//services.AddTransient<ISystemApiClient>(sp => new SystemApiClient(AuthUtils.CreateHttpClient(sp, apiClientConfig)));
	}
}

