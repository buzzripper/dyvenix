using Dyvenix.Auth.Config;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Yarp.ReverseProxy.Transforms;

namespace Dyvenix.Portal.Auth;

public static class ReverseProxyConfig
{
    public static void AddReverseProxyWithAccessToken(this IServiceCollection services, IConfiguration config, AuthConfig authConfig)
    {
        services.AddReverseProxy()
            .LoadFromConfig(config.GetSection("ReverseProxy"))
            .AddTransforms(builderContext =>
            {
                builderContext.AddRequestTransform(async transformContext =>
                {
                    var tokenAcquisition = transformContext.HttpContext.RequestServices.GetRequiredService<ITokenAcquisition>();

                    var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(authConfig.ApiScopes);

                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        transformContext.ProxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                    }
                });
            });
    }
}

