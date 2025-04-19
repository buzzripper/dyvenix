using Microsoft.AspNetCore.Authorization;

namespace Dyvenix.App1.Server.Auth;

public class HasScopeRequirement : IAuthorizationRequirement
{
	public HasScopeRequirement(string scope)
	{
		Scope = scope;
	}

	public string Scope { get; }
}