using Dyvenix.Server.Common.Entities;
using Dyvenix.Server.Data.Contexts;
using Buzzripper.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dyvenix.Portal.Services;

public interface ITestService
{
	void TestLogLevels();
	List<AppUser> TestEF();
}

public class TestService : ITestService
{
	private readonly IDyvenixLogger<TestService> _logger;
	private readonly IDbContextFactory _dbContextFactory;

	public TestService(IDyvenixLogger<TestService> logger, IDbContextFactory dbContextFactory)
	{
		_logger = logger;
		_dbContextFactory = dbContextFactory;
	}

	public void TestLogLevels()
	{
		_logger.Verbose("TestService.Test() Verbose");
		_logger.Debug("TestService.Test() Debug");
		_logger.Info("TestService.Test() Info");
		_logger.Warn("TestService.Test() Warn");
		_logger.Fatal("TestService.Test() Fatal");
		try {
			throw new ApplicationException("YES!! App exception!!!");
		} catch (Exception ex) {
			_logger.Error(ex, ex.Message);
		}
	}

	public List<AppUser> TestEF()
	{
		var db = _dbContextFactory.CreateDbContext();
		return db.AppUser.ToList();
	}
}
