//using Dyvenix.Auth.Core;
//using Dyvenix.Auth.Core.Config;
//using Dyvenix.Auth.Core.Models;
//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Text.Json;
//using System.Text.Json.Serialization;
//using System.Threading.Tasks;

//namespace Dyvenix.Auth.Core.Middleware;

//public class DyvAccessTokenMiddleware
//{
//	private static readonly JsonSerializerOptions JsonSerializerOptions = new JsonSerializerOptions {
//		DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
//		PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//		PropertyNameCaseInsensitive = true
//	};
	
//	private readonly RequestDelegate _next;

//	public DyvAccessTokenMiddleware(RequestDelegate next)
//	{
//		_next = next;
//	}

//	public async Task InvokeAsync(HttpContext context)
//	{
//		if (context.Request.Headers.TryGetValue(AuthConst.TokenHeaderName, out var claimsHeader)) {
//			try {
//				//System.IO.File.WriteAllText(@"c:\work\claimsHeader.json", claimsHeader);

//				//var json = JsonSerializer.Deserialize<string>(claimsHeader);
//				//var dyvToken = JsonSerializer.Deserialize<DyvAccessToken>(json, JsonSerializerOptions);

//				var dyvToken = JsonSerializer.Deserialize<ApiToken>(claimsHeader, JsonSerializerOptions);

//				if (dyvToken != null) {
//					var claims = new List<Claim>
//					{
//						new Claim("dyv_caller_id", dyvToken.CallerId),
//						new Claim("dyv_caller_type", dyvToken.CallerType.ToString())
//					};

//					claims.AddRange(dyvToken.Roles.Select(role => new Claim(AuthConst.RoleKey, role)));

//					var claimsIdentity = new ClaimsIdentity(claims, AuthConst.ClaimsIdentityId); // Sets IsAuthenticated = true
//					context.User = new ClaimsPrincipal(claimsIdentity); // REPLACE the user, don’t just add identity
//				}
//			} catch (Exception ex) {
//				// Ignore malformed header
//				Console.WriteLine(ex.Message);
//			}
//		}

//		await _next(context);
//	}
//}

