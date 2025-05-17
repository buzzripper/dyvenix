using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dyvenix.Portal.Controllers;

[AllowAnonymous]
[Route("auth")]
public class AuthController : Controller
{
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
		return SignOut(
			new AuthenticationProperties { RedirectUri = "https://localhost:4200/example" },
			OpenIdConnectDefaults.AuthenticationScheme,
			CookieAuthenticationDefaults.AuthenticationScheme);
	}
}
