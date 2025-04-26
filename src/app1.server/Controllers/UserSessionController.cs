using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dyvenix.App1.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserSessionController : ControllerBase
{
	[HttpGet("status")]
	public IActionResult Status()
	{
		return Ok(new
		{
			IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
			Name = User.Identity?.Name ?? "(anonymous)"
		});
	}
}
