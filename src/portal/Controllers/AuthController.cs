using Asp.Versioning;
using Dyvenix.Logging;
using Dyvenix.Portal.Controllers;
using Dyvenix.Portal.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;

[ApiController]
[Route("[controller]")]
[ApiVersion("1.0")]
public class AuthController : ApiControllerBase<AuthController>
{
    public AuthController(IDyvenixLogger<AuthController> logger) : base(logger)
    {
    }

    [HttpGet, Route("sign-in")]
    public IActionResult SignIn([FromQuery(Name = "returnUrl")] string returnUrl = "/")
    {
        // Ensure there's always a fallback path
        var encodedReturnUrl = string.IsNullOrWhiteSpace(returnUrl) ? "/" : returnUrl;

        // Redirect to an internal post-login handler that will then send the user to Angular
        var clientAppBaseUri = "https://localhost:4200";

        var finalRedirectUri = $"{clientAppBaseUri}/auth/post-login?returnUrl={Uri.EscapeDataString(encodedReturnUrl)}";

        return Challenge(new AuthenticationProperties
        {
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
        return SignOut(new AuthenticationProperties
        {
            RedirectUri = "/"
        },
        CookieAuthenticationDefaults.AuthenticationScheme,
        OpenIdConnectDefaults.AuthenticationScheme);
    }

    [Authorize]
    [HttpGet, Route("status")]
    public IActionResult GetStatus()
    {
        return Ok(new {
            user = new {
                name = User.Identity?.Name,
                claims = User.Claims.Select(c => new { c.Type, c.Value })
            }
        });
    }

    [HttpGet("/test-cookie")]
    public IActionResult SetTestCookie()
    {
        Response.Cookies.Append("dyv_test", "hello", new CookieOptions
        {
            Secure = true,
            HttpOnly = false,
            SameSite = SameSiteMode.None,
            Path = "/"
        });

        return Ok("Set cookie");
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> GetClaims([FromBody] TokenIssuanceRequest request)
    {
        try
        {
            var reqStr = System.Text.Json.JsonSerializer.Serialize(request);

            //_logger.Info($"GetClaims() [Tenant:{request.Data.TenantId}, Email:{request.Data.User.Email}");

            //var userId = request.Data.User.Id;
            //var email = request.Data.User.Email ?? request.Data.User.UserPrincipalName;

            var perms = new List<string> { "ar_read", "ar_write", "ap_read" };
            var roles = new List<string> { "ar:admin", "ap:user" };

            // Return claims in the expected format
            return Ok(new TokenIssuanceResponse
            {
                Data = new ResponseData
                {
                    Actions = new[]
                {
                        new ClaimsAction
                        {
                            Claims = new Dictionary<string, object>
                            {
                                ["roles"] = roles,
                                ["tenantId"] = "MyTenant",
                                ["permissions"] = "perms",
                                ["tier"] = "GoldTier"
                            }
                        }
                    }
                }
            });
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error processing token issuance");

            // Return error - Entra will proceed without custom claims
            return BadRequest(new {
                error = "processing_error",
                error_description = "Failed to retrieve custom claims"
            });
        }
    }
}
