
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Dyvenix.Bff.Controllers;

[Authorize]
[ApiController]
[Route("system")]
public class SystemController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health()
    {
        return new JsonResult(new { status = "OK", serverTime = DateTime.UtcNow });
    }
}
