using Dyvenix.App1.Server.Config;
using Microsoft.AspNetCore.Authorization;
using Serilog;
using System.Threading.Tasks;

namespace Dyvenix.App1.Server.Auth;

public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
{
	private readonly AppConfig _appConfig;
	private readonly ILogger _logger;

	public HasScopeHandler(ILogger logger, AppConfig appConfig)
	{
		_logger = logger;
		_appConfig = appConfig;
	}

	protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
	{
		//// Return success if auth is turned off
		//if (_appConfig.AuthConfig.Disabled)
		//	return Task.CompletedTask;

		//var scopeClaim = context.User.FindFirst(c => string.Compare(c.Type, "Scope", StringComparison.InvariantCultureIgnoreCase) == 0);

		//if (scopeClaim == null)
		//{
		//	_logger.Warning($"No scope claim received in call from user {context.User.Identity.Name}");
		//	return Task.CompletedTask;
		//}

		////if (string.Compare(scopeClaim.Issuer, _appConfig.AuthConfig.TokenIssuer, true) != 0)
		////{
		////	_logger.Warning($"Scope claim received from wrong issuer [{scopeClaim.Issuer}]. Should be {_appConfig.AuthConfig.TokenIssuer}. User: {context.User.Identity.Name}");
		////	return Task.CompletedTask;
		////}

		//if (string.IsNullOrWhiteSpace(scopeClaim.Value))
		//{
		//	_logger.Warning($"Empty scope claim received in call from user {context.User.Identity.Name}");
		//	return Task.CompletedTask;
		//}

		//var scopes = scopeClaim.Value.Split(',');

		//if (scopes.Any(s => string.Compare(s, requirement.Scope, true) == 0))
		//	context.Succeed(requirement);

		return Task.CompletedTask;
	}
}