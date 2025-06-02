using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dyvenix.AppSvr.Data.Contexts;
using Dyvenix.AppSvr.Common.Entities;
using Dyvenix.Core.Entities;
using Dyvenix.Core.Exceptions;
using Dyvenix.Core.Queries;
using Dyvenix.Logging;
using Dyvenix.AppSvr.Common.Queries;
using Dyvenix.AppSvr.Api.Auth;
using Dyvenix.Common.Api.Services;
using Dyvenix.Common.Api.Auth;

namespace Dyvenix.AppSvr.Api.Services;

public class AccessRolesService : IAccessRolesService
{
	private readonly IDbContextFactory _dbContextFactory;
	private readonly IDyvenixLogger<AccessRolesService> _logger;

	public AccessRolesService(IDbContextFactory dbContextFactory, IDyvenixLogger<AccessRolesService> logger)
	{
		_dbContextFactory = dbContextFactory;
		_logger = logger;
	}

	#region Create

	public async Task<List<string>> GetAccessRolesForUser(Guid userId)
	{
		try {
			//using var db = _dbContextFactory.CreateDbContext();
			//db.Add(accessClaim);
			//await db.SaveChangesAsync();

			//return accessClaim.Id;

			return new List<string> { SvrRoles.User, SvrRoles.Sys_Read, SysRoles.Sys };

		} catch (Exception ex) {
			throw new ConcurrencyApiException("The item was modified or deleted by another user.", _logger.CorrelationId);
		}
	}

	#endregion
}
