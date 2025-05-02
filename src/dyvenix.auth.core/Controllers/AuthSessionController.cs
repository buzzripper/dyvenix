using Asp.Versioning;
using Dyvenix.Auth.Services;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Mvc;

namespace Dyvenix.Auth.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/auth/[controller]")]
public class AuthSessionController : ApiControllerBase<ApiConnectorController>
{
	private readonly IAuthSessionService _authSessionService;

	public AuthSessionController(IAuthSessionService authSessionService, IDyvenixLogger<ApiConnectorController> logger) : base(logger)
	{
		_authSessionService = authSessionService;
	}

	//[HttpPost, Route("[action]")]
	//public async Task<ActionResult<ControllerResponseBase<StartSessionResponse>>> StartSession([FromBody] StartSessionRequest startSessionRequest)
	//{
	//	_logger.Info("Starting StartSession()...");

	//	var response = await _authSessionService.StartSession(startSessionRequest.AuthCode, startSessionRequest.CodeVerifier);

	//	return Ok(response);
	//}
}
