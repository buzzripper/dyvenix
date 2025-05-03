//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Dyvenix.Portal.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.Portal.Config;

public static partial class ServiceCollExt
{
	static partial void AddGeneratedServices(this IServiceCollection services)
	{
		services.AddTransient<IAppUserService, AppUserService>();
		services.AddTransient<IAccessClaimService, AccessClaimService>();
	}
}
