using Asp.Versioning;
using Buzzripper.Logging;
using Dyvenix.Server.Api.Config;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Dyvenix.Server.Api.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
public class SystemController : ApiControllerBase<SystemController>
{
	private readonly AppConfig _appConfig;

	public SystemController(AppConfig appConfig, IDyvenixLogger<SystemController> logger) : base(logger)
	{
		_appConfig = appConfig;
	}

	[HttpGet, Route("[action]")]
	public IActionResult Healthz()
	{
		return Ok($"{_appConfig.AppName} - Healthy");
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
}
