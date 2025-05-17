using Microsoft.AspNetCore.Authorization;

namespace Dyvenix.Auth.Api.Claims;

public class AuthorizeClaimAttribute : AuthorizeAttribute
{
	public AuthorizeClaimAttribute(string claimType, string claimValue)
	{
		Policy = $"{claimType}:{claimValue}";
	}
}
