using Asp.Versioning;
using Dyvenix.Auth.Config;
using Dyvenix.Auth.Models;
using Buzzripper.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Dyvenix.Portal.Services;

namespace Dyvenix.Portal.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/auth/[controller]")]
public class ApiConnectorController : ApiControllerBase<ApiConnectorController>
{
	#region Fields

	private readonly AuthConfig _authConfig;
	private readonly IApiConnectorService _apiConnectorService;

	#endregion

	#region Ctors / Init

	public ApiConnectorController(IDyvenixLogger<ApiConnectorController> logger, AuthConfig authConfig, IApiConnectorService apiConnectorService) : base(logger)
	{
		_authConfig = authConfig;
		_apiConnectorService = apiConnectorService;
	}

	#endregion

	[HttpPost, Route("[action]")]
	public async Task<IActionResult> GetExtClaims([FromBody] RequestConnector requestConnector)
	{
		_logger.Info($"Begin {nameof(GetExtClaims)}()...");
		try {
			// If input data is null, show block page
			if (requestConnector == null) {
				_logger.Warn("Input data (RequestConnector) is empty.");
				return BadRequest(new GetExtClaimsResponse("ShowBlockPage", "There was a problem with your request."));
			}

			// Check HTTP basic authorization
			if (!IsAuthorized(Request)) {
				_logger.Warn("HTTP basic authentication validation failed.");
				return Unauthorized();
			}

			var sb = new StringBuilder();
			sb.Append($"   User Oid={requestConnector.ObjectId}, DisplayName={requestConnector.DisplayName}");
			_logger.Debug(sb.ToString());

			string clientId = _authConfig.AzureAdB2C.ClientId;
			if (!clientId.Equals(requestConnector.ClientId)) {
				_logger.Warn($"HTTP clientId is not authorized. Received: {requestConnector.ClientId}  Expected:{clientId}");
				return Unauthorized();
			}

			// Get the access claims for the access token(s)
			var nameValueColl = _apiConnectorService.GetExtClaims(requestConnector.ObjectId);

			// Create dynamic json object so we can keep the custom claims data-driven
			JsonNode jsonNode = JsonSerializer.SerializeToNode(new GetExtClaimsResponse());
			foreach(var key in nameValueColl.AllKeys) {
				var accessKey = $"extension_{key}";
				var accessValue = nameValueColl[key];
				jsonNode[accessKey] = accessValue;
			}

			_logger.Info($"SUCCESS! Sending back additional claims! JSON:  {jsonNode}");
			return Ok(jsonNode);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(ex);
		}
	}

	private bool IsAuthorized(HttpRequest req)
	{
		// Check if the HTTP Authorization header exist
		if (!req.Headers.ContainsKey("Authorization")) {
			_logger.Warn("Missing HTTP basic authentication header.");
			return false;
		}

		// Read the authorization header
		var auth = req.Headers["Authorization"].ToString();

		// Ensure the type of the authorization header id `Basic`
		if (!auth.StartsWith("Basic ")) {
			_logger.Warn("HTTP basic authentication header must start with 'Basic '.");
			return false;
		}

		// Get the the HTTP basic authorization credentials
		var cred = Encoding.UTF8.GetString(Convert.FromBase64String(auth.Substring(6))).Split(':');

		// Evaluate the credentials and return the result
		if (cred[0] != _authConfig.ApiConnectorUsername) { 
			_logger.Error($"B2C username incorrect. Received: {cred[0]}");
			return false;
		}

		if (cred[1] != _authConfig.ApiConnectorPassword) { 
			_logger.Error($"B2C password incorrect.");
			return false;
		}

		return true;
	}
}
