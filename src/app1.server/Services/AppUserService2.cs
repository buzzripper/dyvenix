//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Dyvenix.App1.Data.Contexts;
using Dyvenix.App1.Common.Entities;
using Dyvenix.Core.Exceptions;
using Dyvenix.Logging;

namespace Dyvenix.App1.Server.Services;

public interface IAppUserService2
{
	Task UpdateFirstName(Guid id, byte[] rowVersion, string firstName);
}

public class AppUserService2 : IAppUserService2
{
	private readonly IDbContextFactory _dbContextFactory;
	private readonly IDyvenixLogger<AppUserService2> _logger;

	public AppUserService2(IDbContextFactory dbContextFactory, IDyvenixLogger<AppUserService2> logger)
	{
		_dbContextFactory = dbContextFactory;
		_logger = logger;
	}

	public async Task UpdateFirstName(Guid id, byte[] rowVersion, string firstName)
	{
		ArgumentNullException.ThrowIfNull(firstName);

		try {
			var appUser = new AppUser {
				Id = id,
				RowVersion = rowVersion,
				FirstName = firstName
			};
			using var db = _dbContextFactory.CreateDbContext();

			db.Attach(appUser);
			db.Entry(appUser).Property(u => u.FirstName).IsModified = true;
			await db.SaveChangesAsync();

		} catch (DbUpdateConcurrencyException) {
			throw new ConcurrencyApiException("The item was modified or deleted by another user.", _logger.CorrelationId);
		}
	}

}
