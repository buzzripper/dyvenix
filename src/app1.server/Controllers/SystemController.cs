using Asp.Versioning;
using Dyvenix.App1.Server.Config;
using Dyvenix.App1.Server.Services;
using Dyvenix.Auth.Claims;
using Dyvenix.Auth.Config;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.TokenCacheProviders;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Dyvenix.App1.Server.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class SystemController : ApiControllerBase<SystemController>
{
	private readonly AppConfig _appConfig;
	private readonly AuthConfig _authConfig;
	private readonly ITestService _testService;
	private readonly ITokenAcquisition _tokenAcquisition;
	private readonly IMsalTokenCacheProvider _tokenCacheProvider;

	public SystemController(AppConfig appConfig, IDyvenixLogger<SystemController> logger, ITestService testService, ITokenAcquisition tokenAcquisition, IMsalTokenCacheProvider tokenCacheProvider, AuthConfig authConfig) : base(logger)
	{
		_appConfig = appConfig;
		_testService = testService;
		_tokenAcquisition = tokenAcquisition;
		_tokenCacheProvider = tokenCacheProvider;
		_authConfig = authConfig;
	}

	[HttpGet, Route("[action]")]
	public IActionResult Healthz()
	{
		return Ok("Healthy");
	}

	[HttpGet, Route("[action]")]
	public IActionResult GetConfig()
	{
		return Ok(_appConfig);
	}

	[HttpGet, Route("[action]")]
	public IActionResult TestLogLevels()
	{
		_testService.TestLogLevels();
		return Ok();
	}


	//[Authorize]
	//[HttpGet("[action]")]
	//public async Task<IActionResult> Status()
	//{
	//	_logger.Info("IsAuthenticated: " + (User?.Identity?.IsAuthenticated ?? false));
	//	_logger.Info("User Name: " + (User?.Identity?.Name ?? "null"));

	//	foreach (var claim in User.Claims)
	//		_logger.Info("Claim Type: " + claim.Type + " Value: " + claim.Value);

	//	var oid = User?.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
	//	_logger.Info("OID claim: " + (oid ?? "null"));

	//	try {
	//		var scopes = _authConfig.OidcScopes;
	//		scopes.AddRange(_authConfig.ApiScopes);

	//		var accessToken = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes: scopes, user: User);

	//		if (string.IsNullOrEmpty(accessToken)) {
	//			_logger.Info("Access token is null or empty.");
	//			return Ok(new { Token = "null", Message = "Access token missing." });
	//		}

	//		return Ok(new { Token = accessToken });

	//	} catch (MsalUiRequiredException ex) {
	//		_logger.Warn("Token acquisition failed - user re-auth needed: " + ex.Message);
	//		return Unauthorized(new { Message = "User must re-authenticate" });

	//	} catch (Exception ex) {
	//		_logger.Info("Exception while acquiring token: " + ex.Message);
	//		return StatusCode(500, "Error acquiring token");
	//	}
	//}

	//[Authorize]
	//[HttpGet("[action]")]
	//public async Task<IActionResult> Status()
	//{
	//	_logger.Info($"IsAuthenticated: {User?.Identity?.IsAuthenticated ?? false}");
	//	_logger.Info($"User Name: {User?.Identity?.Name ?? "null"}");

	//	try {
	//		var accessToken = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes: _authConfig.ApiScopes, user: User);

	//		if (string.IsNullOrEmpty(accessToken)) {
	//			_logger.Warn("Access token is null.");
	//			return Unauthorized(new { Message = "Access token not available." });
	//		}

	//		return Ok(new
	//		{
	//			AccessTokenAvailable = true,
	//			User = User.Identity?.Name,
	//			Claims = User.Claims.Select(c => new { c.Type, c.Value })
	//		});
	//	} catch (MsalUiRequiredException ex) {
	//		_logger.Warn("Token acquisition failed - user must re-authenticate: " + ex.Message);
	//		return Unauthorized(new { Message = "Re-authentication required." });
	//	} catch (Exception ex) {
	//		_logger.Error("Unexpected error during token acquisition: " + ex.Message);
	//		return StatusCode(500, "Server error during token acquisition.");
	//	}
	//}

	[Authorize]
	[HttpGet("status")]
	public async Task<IActionResult> Status()
	{
		try {
			var oid = User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
			_logger.Info("OID: " + (oid ?? "null"));

			_logger.Info("Attempting to acquire access token...");

			var token = await _tokenAcquisition.GetAccessTokenForUserAsync(_authConfig.ApiScopes, user: User);

			_logger.Info(token == null ? "Returned null" : "Access token acquired");


			return Ok(new
			{
				AccessTokenAvailable = true,
				User = User.Identity?.Name,
				TokenStart = token?.Substring(0, 25) + "...",
				Claims = User.Claims.Select(c => new { c.Type, c.Value })
			});

		} catch (MsalUiRequiredException ex) {
			_logger.Warn("Token acquisition failed: " + ex.Message);
			return Unauthorized(new { Message = "Login required" });
		}
	}

	[AuthorizeClaim("extension_MyCustomClaim", "TheDudeAbides")]
	[HttpGet("[action]")]
	public async Task<IActionResult> ClaimCheck()
	{
		return Ok("Yaaaay!!!");
	}

}
