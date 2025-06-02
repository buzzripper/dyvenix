//using Asp.Versioning;
//using Dyvenix.Common.Api.Attributes;
//using Dyvenix.Common.Api.Auth;
//using Dyvenix.Common.Api.Services;
//using Dyvenix.Logging;
//using Microsoft.AspNetCore.Mvc;
//using System;

//namespace Dyvenix.Common.Api.Controllers;

//[ApiController]
//[Route("api/v{version:apiVersion}/[controller]")]
//[ApiVersion("1.0")]
//public class SystemController : ApiControllerBase<SystemController>
//{
//	private readonly ISystemService _systemService;

//	public SystemController(ISystemService systemService, IDyvenixLogger<SystemController> logger) : base(logger)
//	{
//		_systemService = systemService;
//	}

//	[HttpGet, Route("[action]")]
//	[AuthorizeDyvRole(SysRoles.Sys)]
//	public IActionResult Healthz()
//	{
//		try {
//			_systemService.Healthz();
//			return Ok("Healthy");

//		} catch (Exception ex) {
//			return StatusCode(503, $"Unhealthy - {ex.Message}");
//		}
//	}
//}
