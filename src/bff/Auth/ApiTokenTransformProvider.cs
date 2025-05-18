using Dyvenix.Auth.Core;
using Dyvenix.Bff.Config;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Yarp.ReverseProxy.Transforms;
using Yarp.ReverseProxy.Transforms.Builder;

namespace Dyvenix.Bff.Auth;

public class ApiTokenTransformProvider : ITransformProvider
{
	private readonly AuthConfig _authConfig;

	public ApiTokenTransformProvider(AuthConfig authConfig)
	{
		_authConfig = authConfig;
	}

	public void Apply(TransformBuilderContext context)
	{
		context.AddRequestTransform(async transformContext => {
			var httpContext = transformContext.HttpContext;
			var user = httpContext.User;

			if (!user.Identity?.IsAuthenticated ?? true)
				return;

			var userId = user.FindFirst("uid")?.Value;
			if (string.IsNullOrEmpty(userId))
				return;

			// OIDC access token for downstream APIs
			var tokenAcquisition = httpContext.RequestServices.GetRequiredService<ITokenAcquisition>();
			var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync([_authConfig.Scope]);
			transformContext.ProxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

			// Dyvenix Access token for downstream APIs
			var dyvAccessTokenProvider = httpContext.RequestServices.GetRequiredService<IDyvAccessTokenProvider>();
			var dyvTokenJson = await dyvAccessTokenProvider.GetAccessClaimsForUserAsync(userId);
			transformContext.ProxyRequest.Headers.Add(AuthConst.TokenHeaderName, dyvTokenJson);
		});
	}

	public void ValidateRoute(TransformRouteValidationContext context)
	{
		// No validation needed for this transform
	}

	public void ValidateCluster(TransformClusterValidationContext context)
	{
		// No validation needed for this transform
	}
}
