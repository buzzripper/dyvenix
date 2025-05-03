using Asp.Versioning;
using Dyvenix.Portal.Config;
using Dyvenix.Portal.Services;
using Dyvenix.Auth.Claims;
using Dyvenix.Auth.Config;
using Buzzripper.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace Dyvenix.Portal.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class SystemController : ApiControllerBase<SystemController>
{
	private readonly AppConfig _appConfig;
	private readonly AuthConfig _authConfig;
	private readonly ITokenAcquisition _tokenAcquisition;

	public SystemController(AppConfig appConfig, IDyvenixLogger<SystemController> logger, ITokenAcquisition tokenAcquisition, AuthConfig authConfig) : base(logger)
	{
		_appConfig = appConfig;
		_tokenAcquisition = tokenAcquisition;
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
		_logger.Verbose("TestService.Test() Verbose");
		_logger.Debug("TestService.Test() Debug");
		_logger.Info("TestService.Test() Info");
		_logger.Warn("TestService.Test() Warn");
		_logger.Fatal("TestService.Test() Fatal");
		try {
			throw new ApplicationException("YES!! App exception!!!");
		} catch (Exception ex) {
			_logger.Error(ex, ex.Message);
		}

		return Ok();
	}

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
	public IActionResult ClaimCheck()
	{
		return Ok("Yaaaay!!!");
	}
}
