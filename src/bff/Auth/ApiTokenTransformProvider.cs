using Dyvenix.Auth.Core.Config;
using Dyvenix.Common.Api;
using Dyvenix.Common.Api.Auth;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using System;
using Yarp.ReverseProxy.Transforms;
using Yarp.ReverseProxy.Transforms.Builder;

namespace Dyvenix.Bff.Auth;

public class ApiTokenTransformProvider : ITransformProvider
{
	private readonly AuthConfig _authConfig;
	//private readonly IDyvenixLogger<ApiTokenProvider> _logger;

	public ApiTokenTransformProvider(AuthConfig authConfig/*, IDyvenixLogger<ApiTokenProvider> logger*/)
	{
		_authConfig = authConfig;
		//_logger = logger;
	}

	public void Apply(TransformBuilderContext context)
	{
		context.AddRequestTransform(async transformContext => {
			var httpContext = transformContext.HttpContext;

			var user = httpContext.User;

			if (!user.Identity?.IsAuthenticated ?? true) {
				//_logger.Warn($"User is not authenticated");
				return;
			}

			//var userId = user.FindFirst("uid")?.Value;
			//if (string.IsNullOrEmpty(userId)) {
			//	//_logger.Warn($"User id not found [{userId}]");
			//	return;
			//}

			try {
				// OIDC access token for downstream APIs
				var tokenAcquisition = httpContext.RequestServices.GetRequiredService<ITokenAcquisition>();

				// DEBUG
				//var options = httpContext.RequestServices.GetService<IOptions<MicrosoftIdentityOptions>>();
				var options = httpContext.RequestServices.GetRequiredService<IOptionsMonitor<MicrosoftIdentityOptions>>().Get(OpenIdConnectDefaults.AuthenticationScheme);


				var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(scopes: _authConfig.Scopes, authenticationScheme: OpenIdConnectDefaults.AuthenticationScheme);
				transformContext.ProxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

				//// Get the ApiToken (custom Dyvenix access token) for downstream APIs and add to the request headers
				//var userApiTokenProvider = httpContext.RequestServices.GetRequiredService<IUserApiTokenProvider>();
				//var dyvTokenJson = await userApiTokenProvider.GetApiTokenJson(userId);
				//transformContext.ProxyRequest.Headers.Add(AuthConst.TokenHeaderName, dyvTokenJson);

			} catch (Exception ex) {
				//_logger.Error(ex, $"Failed to get Dyvenix access token for user {userId}");
				Console.WriteLine(ex.ToString());
			}
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
