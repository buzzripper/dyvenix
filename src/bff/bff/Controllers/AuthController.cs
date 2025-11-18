using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Dyvenix.Bff.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    [HttpGet("login")]
    public IActionResult Login([FromQuery] string? returnUrl = null)
    {
        Console.WriteLine($"🔵 /auth/login called");
        Console.WriteLine($"   returnUrl: {returnUrl ?? "(none)"}");
        
        // Store returnUrl in authentication properties so it survives the OIDC roundtrip
        var properties = new AuthenticationProperties
        {
            RedirectUri = null
        };
        
        if (!string.IsNullOrEmpty(returnUrl))
        {
            properties.Items["returnUrl"] = returnUrl;
        }
        
        return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
    }

    [HttpGet("logout")]
    public IActionResult Logout()
    {
        Console.WriteLine("🔵 /auth/logout called");
        
        // Sign out - the Program.cs configuration will redirect back to Angular
        return SignOut(
            new AuthenticationProperties(),
            CookieAuthenticationDefaults.AuthenticationScheme,
            OpenIdConnectDefaults.AuthenticationScheme);
    }

    [HttpGet("user")]
    [Authorize]
    public IActionResult GetUser()
    {
        Console.WriteLine("🔵 /auth/user called");
        Console.WriteLine($"   Request Headers:");
        Console.WriteLine($"     Host: {Request.Headers["Host"]}");
        Console.WriteLine($"     Origin: {Request.Headers["Origin"]}");
        Console.WriteLine($"     Referer: {Request.Headers["Referer"]}");
        Console.WriteLine($"     Cookie header present: {Request.Headers.ContainsKey("Cookie")}");
        
        if (Request.Headers.ContainsKey("Cookie"))
        {
            var cookies = Request.Headers["Cookie"].ToString();
            Console.WriteLine($"     Cookie header length: {cookies.Length}");
            Console.WriteLine($"     Has BFF auth cookie: {cookies.Contains(".AspNetCore.BFF.Auth")}");
        }
        
        Console.WriteLine($"   IsAuthenticated: {User.Identity?.IsAuthenticated}");
        Console.WriteLine($"   Name: {User.Identity?.Name}");
        
        if (!User.Identity?.IsAuthenticated ?? false)
        {
            Console.WriteLine("❌ /auth/user: User not authenticated - returning 401");
            return Unauthorized();
        }

        var claims = User.Claims
            .Select(c => new { Type = c.Type.Split('/').Last(), c.Value })
            .GroupBy(c => c.Type)
            .ToDictionary(g => g.Key, g => g.First().Value);

        Console.WriteLine($"✅ /auth/user: Returning {claims.Count} claims");
        
        return Ok(claims);
    }
}
