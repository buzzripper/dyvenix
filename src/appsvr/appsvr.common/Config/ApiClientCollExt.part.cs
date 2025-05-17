//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Dyvenix.AppSvr.Common.ApiClients;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.AppSvr.Common.Config;

public static partial class ApiClientCollExt
{
	static partial void AddGeneratedApiClients(this IServiceCollection services, ApiClientConfig apiClientConfig)
	{
		services.AddTransient<IAppUserApiClient, AppUserApiClient>();
		services.AddTransient<IAccessClaimApiClient, AccessClaimApiClient>();
	}
}
