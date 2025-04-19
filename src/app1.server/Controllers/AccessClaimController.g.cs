//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Dyvenix.Core.Controllers;
using Dyvenix.Core.DTOs;
using Dyvenix.Core.Entities;
using Dyvenix.Logging;
using Dyvenix.App1.Server.Services;
using Dyvenix.App1.Common.Queries;
using Dyvenix.App1.Common.Entities;
using Dyvenix.App1.Server.DTOs;

namespace Dyvenix.App1.Server.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/[controller]")]
public class AccessClaimController : ApiControllerBase<AccessClaimController>
{
	private readonly IAccessClaimService _accessClaimService;

	public AccessClaimController(IAccessClaimService accessClaimService, IDyvenixLogger<AccessClaimController> logger) : base(logger)
	{
		_accessClaimService = accessClaimService;
	}

	#region Create

	[HttpPost, Route("[action]")]
	public async Task<ActionResult> CreateAccessClaim(AccessClaim accessClaim)
	{
		var apiResponse = CreateApiResponse<Guid>();
		try {
			apiResponse.Data = await _accessClaimService.CreateAccessClaim(accessClaim);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	#endregion

	#region Delete

	[HttpPost, Route("[action]/{id}")]
	public async Task<ActionResult> DeleteAccessClaim(Guid id)
	{
		var apiResponse = CreateApiResponse<bool>();
		try {
			apiResponse.Data = await _accessClaimService.DeleteAccessClaim(id);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	#endregion

	#region Update

	[HttpPut, Route("[action]")]
	public async Task<ActionResult> UpdateAccessClaim(AccessClaim accessClaim)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _accessClaimService.UpdateAccessClaim(accessClaim);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	[HttpPatch, Route("[action]")]
	public async Task<ActionResult> UpdateClaimName(UpdateClaimNameReq request)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _accessClaimService.UpdateClaimName(request.Id, request.RowVersion, request.ClaimName);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	#endregion




}
