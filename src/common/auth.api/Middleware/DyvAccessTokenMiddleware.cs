using Dyvenix.Auth.Core;
using Dyvenix.Auth.Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Api.Middleware;

public class DyvAccessTokenMiddleware
{
    private readonly RequestDelegate _next;

    public DyvAccessTokenMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Headers.TryGetValue(AuthConst.TokenHeaderName, out var claimsHeader))  
        {
            try
            {
                var dyvToken = JsonSerializer.Deserialize<DyvAccessToken>(claimsHeader);

                if (dyvToken != null)
                {
                    var claimsIdentity = new ClaimsIdentity(AuthConst.ClaimsIdentityId);

                    foreach (var role in dyvToken.Roles)
                    {
                        claimsIdentity.AddClaim(new Claim(AuthConst.RoleKey, role));
                    }

                    claimsIdentity.AddClaim(new Claim("dyv_caller_id", dyvToken.CallerId));
                    claimsIdentity.AddClaim(new Claim("dyv_caller_type", dyvToken.CallerType.ToString()));

                    context.User.AddIdentity(claimsIdentity);
                }
            }
            catch (Exception ex)
            {
                // Ignore malformed header
                Console.WriteLine(ex.Message);
            }
        }

        await _next(context);
    }
}
