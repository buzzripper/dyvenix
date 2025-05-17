using Dyvenix.Bff.Config;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Yarp.ReverseProxy.Transforms;
using Yarp.ReverseProxy.Transforms.Builder;

namespace Dyvenix.Bff.Auth;

public class UserClaimsTransformProvider : ITransformProvider
{
	private readonly AuthConfig _authConfig;

	public UserClaimsTransformProvider(AuthConfig authConfig)
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

			var tokenAcquisition = httpContext.RequestServices.GetRequiredService<ITokenAcquisition>();
			var accessClaimProvider = httpContext.RequestServices.GetRequiredService<IAccessClaimProvider>();

			var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync([_authConfig.Scope]);

			var claimsJson = await accessClaimProvider.GetAccessClaimsForUserAsync(userId);

			transformContext.ProxyRequest.Headers.Authorization =
				new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

			transformContext.ProxyRequest.Headers.Add("Dyvenix-User-Claims", claimsJson);
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
