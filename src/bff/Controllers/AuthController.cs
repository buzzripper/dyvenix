using Asp.Versioning;
using Dyvenix.Bff.Controllers;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using System;
using System.Linq;

[ApiController]
[Route("[controller]")]
[ApiVersion("1.0")]
public class AuthController : ApiControllerBase<AuthController>
{
	public AuthController(IDyvenixLogger<AuthController> logger) : base(logger)
	{
	}

	[HttpGet, Route("sign-in")]
	public IActionResult SignIn([FromQuery(Name = "returnUrl")] string? returnUrl = "/")
	{
		// Ensure there's always a fallback path
		var encodedReturnUrl = string.IsNullOrWhiteSpace(returnUrl) ? "/" : returnUrl;

		// Redirect to an internal post-login handler that will then send the user to Angular
		var clientAppBaseUri = "https://localhost:4200";

		var finalRedirectUri = $"{clientAppBaseUri}/auth/post-login?returnUrl={Uri.EscapeDataString(encodedReturnUrl)}";

		return Challenge(new AuthenticationProperties {
			RedirectUri = finalRedirectUri
		}, OpenIdConnectDefaults.AuthenticationScheme);
	}

	[HttpGet, Route("post-login")]
	public IActionResult PostLoginRedirect([FromQuery] string returnUrl = "/")
	{
		// Now that the cookie is established, redirect to Angular
		return Redirect($"https://localhost:4200{returnUrl}");
	}

	[HttpGet, Route("sign-out")]
	public IActionResult SignOutUser()
	{
		return SignOut(new AuthenticationProperties {
			RedirectUri = "/"
		},
		CookieAuthenticationDefaults.AuthenticationScheme,
		OpenIdConnectDefaults.AuthenticationScheme);
	}

	[Authorize]
	[HttpGet, Route("status")]
	public IActionResult GetStatus()
	{
		return Ok(new
		{
			user = new
			{
				name = User.Identity?.Name,
				claims = User.Claims.Select(c => new { c.Type, c.Value })
			}
		});
	}

	[HttpGet("/test-cookie")]
	public IActionResult SetTestCookie()
	{
		Response.Cookies.Append("dyv_test", "hello", new CookieOptions {
			Secure = true,
			HttpOnly = false,
			SameSite = SameSiteMode.None,
			Path = "/"
		});

		return Ok("Set cookie");
	}

}
