//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Dyvenix.AppSvr.Api.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.AppSvr.Api.Config;

public static partial class ServiceCollExt
{
	static partial void AddGeneratedServices(this IServiceCollection services)
	{
		services.AddTransient<IAppUserService, AppUserService>();
		services.AddTransient<IAccessClaimService, AccessClaimService>();
	}
}
