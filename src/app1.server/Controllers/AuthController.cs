using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Dyvenix.App1.Server.Controllers;

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

	//[HttpGet("login")]
	//[AllowAnonymous]
	//public IActionResult Login(string returnUrl = "/")
	//{
	//	var redirectUrl = Url.Action("LoginCallback", "Auth", new { returnUrl });

	//	var props = new AuthenticationProperties {
	//		RedirectUri = redirectUrl
	//	};

	//	//props.SetParameter("prompt", "consent"); // ⬅️ forces token issuance

	//	return Challenge(props, OpenIdConnectDefaults.AuthenticationScheme);
	//}

	[HttpGet("logout")]
	public IActionResult Logout()
	{
		return SignOut(
			new AuthenticationProperties { RedirectUri = "https://localhost:4200/example" },
			OpenIdConnectDefaults.AuthenticationScheme,
			CookieAuthenticationDefaults.AuthenticationScheme);
	}
}
