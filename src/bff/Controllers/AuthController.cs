using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Dyvenix.Bff.Controllers;

[AllowAnonymous]
[Route("auth")]
public class AuthController : Controller
{
	private readonly IMemoryCache _cache;

	public AuthController(IMemoryCache cache)
	{
		_cache = cache;
	}

	[HttpGet("login")]
	public IActionResult Login(string returnUrl = "/")
	{
		return Challenge(new AuthenticationProperties {
			RedirectUri = returnUrl
		}, OpenIdConnectDefaults.AuthenticationScheme);
	}

	[HttpGet("logout")]
	public IActionResult Logout()
	{
		//var userId = User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
		//if (!string.IsNullOrEmpty(userId)) {
		//	//_cache..Remove($"user:{userId}:data");
		//}

		return SignOut(
			new AuthenticationProperties { RedirectUri = "https://localhost:4200/example" },
			OpenIdConnectDefaults.AuthenticationScheme,
			CookieAuthenticationDefaults.AuthenticationScheme);

	}
}
