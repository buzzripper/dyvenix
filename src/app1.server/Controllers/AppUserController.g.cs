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
public class AppUserController : ApiControllerBase<AppUserController>
{
	private readonly IAppUserService _appUserService;

	public AppUserController(IAppUserService appUserService, IDyvenixLogger<AppUserController> logger) : base(logger)
	{
		_appUserService = appUserService;
	}

	#region Create

	[HttpPost, Route("[action]")]
	public async Task<ActionResult> CreateAppUser(AppUser appUser)
	{
		var apiResponse = CreateApiResponse<Guid>();
		try {
			apiResponse.Data = await _appUserService.CreateAppUser(appUser);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	#endregion

	#region Delete

	[HttpPost, Route("[action]/{id}")]
	public async Task<ActionResult> DeleteAppUser(Guid id)
	{
		var apiResponse = CreateApiResponse<bool>();
		try {
			apiResponse.Data = await _appUserService.DeleteAppUser(id);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	#endregion

	#region Update

	[HttpPut, Route("[action]")]
	public async Task<ActionResult> UpdateAppUser(AppUser appUser)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _appUserService.UpdateAppUser(appUser);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	[HttpPatch, Route("[action]")]
	public async Task<ActionResult> UpdateEmail(UpdateEmailReq request)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _appUserService.UpdateEmail(request.Id, request.RowVersion, request.Email);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	[HttpPatch, Route("[action]")]
	public async Task<ActionResult> UpdateUserType(UpdateUserTypeReq request)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _appUserService.UpdateUserType(request.Id, request.RowVersion, request.UserType);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	[HttpPatch, Route("[action]")]
	public async Task<ActionResult> UpdateGroupCode(UpdateGroupCodeReq request)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _appUserService.UpdateGroupCode(request.Id, request.RowVersion, request.GroupCode);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	[HttpPatch, Route("[action]")]
	public async Task<ActionResult> UpdateName(UpdateNameReq request)
	{
		var apiResponse = CreateApiResponse<byte[]>();
		try {
			apiResponse.Data = await _appUserService.UpdateName(request.Id, request.RowVersion, request.FirstName, request.LastName);

			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	#endregion

	[HttpGet, Route("[action]/{id}")]
	public async Task<ActionResult<AppUser>> GetById(Guid id)
	{
		var apiResponse = CreateApiResponse<AppUser>();
		try {
			apiResponse.Data =  await _appUserService.GetById(id);
			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}

	[HttpGet, Route("[action]/{id}")]
	public async Task<ActionResult<AppUser>> GetByIdwClaims(Guid id)
	{
		var apiResponse = CreateApiResponse<AppUser>();
		try {
			apiResponse.Data =  await _appUserService.GetByIdwClaims(id);
			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}



	[HttpGet, Route("[action]")]
	public async Task<ActionResult<List<AppUser>>> GetAll()
	{
		var apiResponse = CreateApiResponse<List<AppUser>>();
		try {
			apiResponse.Data =  await _appUserService.GetAll();
			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}
	[HttpGet, Route("[action]/{userType}")]
	public async Task<ActionResult<List<AppUser>>> ReadMethod1([FromRoute] UserType userType)
	{
		var apiResponse = CreateApiResponse<List<AppUser>>();
		try {
			apiResponse.Data =  await _appUserService.ReadMethod1(userType);
			return Ok(apiResponse);

		} catch (Exception ex) {
			return LogErrorAndReturnErrorResponse(apiResponse, ex);
		}
	}


}
