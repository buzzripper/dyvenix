//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Dyvenix.App1.Server.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Dyvenix.App1.Server.Config;

public static partial class ServiceCollExt
{
	static partial void AddGeneratedServices(this IServiceCollection services)
	{
		services.AddTransient<IAppUserService, AppUserService>();
		services.AddTransient<IAccessClaimService, AccessClaimService>();
	}
}
