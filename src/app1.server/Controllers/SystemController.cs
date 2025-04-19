using Asp.Versioning;
using Dyvenix.App1.Server.Config;
using Dyvenix.App1.Server.Services;
using Dyvenix.Auth.Core.Controllers;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Mvc;

namespace Dyvenix.App1.Server.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion(1.0)]
public class SystemController : ApiControllerBase<SystemController>
{
	private readonly AppConfig _appConfig;
	private readonly ITestService _testService;

	public SystemController(AppConfig appConfig, IDyvenixLogger<SystemController> logger, ITestService testService) : base(logger)
	{
		_appConfig = appConfig;
		_testService = testService;
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
}
