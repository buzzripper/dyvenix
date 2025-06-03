using Asp.Versioning;
using Dyvenix.Common.Api.Auth;
using Dyvenix.Common.Api.Services;
using Dyvenix.Core.DTOs;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Dyvenix.Common.Api.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class AccessRolesController : ApiControllerBase<AccessRolesController>
{
	private readonly IAccessRolesService _accessRoleService;

	public AccessRolesController(IAccessRolesService accessRoleService, IDyvenixLogger<AccessRolesController> logger) : base(logger)
	{
		_accessRoleService = accessRoleService;
	}

	[HttpGet, Route("[action]/{userId}")]
	[AuthorizeDyvRole(SysRoles.Sys)]
	public async Task<ActionResult<List<string>>> GetAccessRolesForUser(Guid userId)
	{
		try {
			var roles = await _accessRoleService.GetAccessRolesForUser(userId);
			return Ok(roles);

		} catch (Exception ex) {
			return new ObjectResult(ex.Message) { StatusCode = (int)HttpStatusCode.InternalServerError };
		}
	}
}
