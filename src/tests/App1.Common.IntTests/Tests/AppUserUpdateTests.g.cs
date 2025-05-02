//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Xunit.Abstractions;
using Dyvenix.Core.Tests;
using Dyvenix.App1.Common.ApiClients;
using Dyvenix.App1.Tests.Common.Data;
using Dyvenix.App1.Common.Entities;
using Dyvenix.App1.Tests.Common;
using Dyvenix.App1.Data;
using Dyvenix.App1.Data.Contexts;
using Dyvenix.App1.Server.DTOs;

namespace Dyvenix.App1.Common.IntTests.Tests;

#region Fixture

public class AppUserUpdateTestsFixture : IDisposable
{
	public AppUserUpdateTestsFixture()
	{
		ServerApiFactory = new ServerApiFactory();
		ServiceProvider = ServerApiFactory.Services;
	}

	public ServerApiFactory ServerApiFactory { get; private set; }
	public IServiceProvider ServiceProvider { get; }

	public IAppUserApiClient AppUserApiClient { get; }
	public IDataManager DataManager { get; }

	public void Dispose()
	{
		ServerApiFactory.Dispose();
	}
}

#endregion

[Collection("Global Collection")]
public class AppUserUpdateTests : TestBase, IClassFixture<AppUserUpdateTestsFixture>, IDisposable
{
	#region Fields

	private readonly AppUserUpdateTestsFixture _classFixture;
	private readonly IAppUserApiClient _apiClient;
	private readonly ITestOutputHelper _output;
	private readonly Db _db;
	private readonly IDataManager _dataManager;

	#endregion

	#region Ctors / Init

	public AppUserUpdateTests(AppUserUpdateTestsFixture classFixture, ITestOutputHelper output)
	{
		_classFixture = classFixture;
		_output = output;

		_apiClient = classFixture.ServiceProvider.GetRequiredService<IAppUserApiClient>();
		_db = classFixture.ServiceProvider.GetRequiredService<IDbContextFactory>().CreateDbContext();
		_output = output;
		_dataManager = classFixture.ServiceProvider.GetRequiredService<IDataManager>();
	}

	public void Dispose()
	{
	}

	#endregion

	#region Create

	[Fact]
	public async Task Create_ValidId()
	{
		// Arrange
		var appUser = CreateAppUser();
		// Act
		var newId = await _apiClient.CreateAppUser(appUser);
		// Assert
		Assert.Equal(appUser.Id, newId);
		var retAppUser = await _db.AppUser.FindAsync(newId);
		Assert.NotNull(retAppUser);
		Assert.Equal(newId, retAppUser.Id);
	}

	[Fact]
	public async Task Create_InvalidId()
	{
		// Arrange
		var appUser = CreateAppUser();
		appUser.Id = Guid.Empty;

		// Act
		var newId = await _apiClient.CreateAppUser(appUser);

		// Assert
		Assert.NotEqual(Guid.Empty, newId);
		var retAppUser = await _db.AppUser.FindAsync(newId);
		Assert.NotNull(retAppUser);
		Assert.Equal(newId, retAppUser.Id);
	}

	[Fact]
	public async Task Create_NullAppUser()
	{
		// Act / Assert
		await Assert.ThrowsAsync<ArgumentNullException>(async () => await _apiClient.CreateAppUser(null));
	}

	#endregion

	#region Delete

	[Fact]
	public async Task Delete_Success()
	{
		// Arrange
		var ds = await _dataManager.ResetDataSet(DataSetType.Default);
		var appUser = ds.AppUser.Skip(RndInt(0, ds.AppUser.ToList().Count)).First();
		var id = appUser.Id;

		// Act
		var result = await _apiClient.DeleteAppUser(id);

		// Assert
		Assert.True(result);
	}

	[Fact]
	public async Task Delete_NotFound()
	{
		// Arrange
		var id = Guid.NewGuid();

		// Act
		var result = await _apiClient.DeleteAppUser(id);

		// Assert
		Assert.False(result);
	}

	#endregion

	#region Update

	[Fact]
	public async Task FullUpdate_Success()
	{
		// Arrange
		var appUser = _db.AppUser.Skip(RndInt(0, _db.AppUser.ToList().Count)).First();
		appUser.IsEnabled = RndBool();
		appUser.FirstName = RndStr(100);
		appUser.LastName = RndStr(100);
		appUser.Email = RndStr(200);
		appUser.CompanyId = RndStr(10);
		appUser.ExtId = RndStr(68);
		appUser.GroupCode = RndInt();
		appUser.UserType = RndEnum<UserType>();

		// Act
		await _apiClient.UpdateAppUser(appUser);

		// Assert
		var retAppUser = _db.AppUser.Find(appUser.Id);
		Assert.Equal(retAppUser.Id, appUser.Id);
		Assert.Equal(retAppUser.IsEnabled, appUser.IsEnabled);
		Assert.Equal(retAppUser.FirstName, appUser.FirstName);
		Assert.Equal(retAppUser.LastName, appUser.LastName);
		Assert.Equal(retAppUser.Email, appUser.Email);
		Assert.Equal(retAppUser.CompanyId, appUser.CompanyId);
		Assert.Equal(retAppUser.ExtId, appUser.ExtId);
		Assert.Equal(retAppUser.GroupCode, appUser.GroupCode);
		Assert.Equal(retAppUser.UserType, appUser.UserType);
	}

	[Fact]
	public async Task UpdateEmail_Success()
	{
		// Arrange
		var appUser = _db.AppUser.Skip(RndInt(0, _db.AppUser.ToList().Count)).First();
		var request = new UpdateEmailReq {
			Id = appUser.Id,
			RowVersion = appUser.RowVersion,
			Email = RndStr(200)
		};

		// Act
		var newRowVersion = await _apiClient.UpdateEmail(request);

		// Assert
		var retAppUser = _db.AppUser.Find(appUser.Id);
		Assert.Equal(retAppUser.Email, appUser.Email);
	}

	[Fact]
	public async Task UpdateUserType_Success()
	{
		// Arrange
		var appUser = _db.AppUser.Skip(RndInt(0, _db.AppUser.ToList().Count)).First();
		var request = new UpdateUserTypeReq {
			Id = appUser.Id,
			RowVersion = appUser.RowVersion,
			UserType = RndEnum<UserType>()
		};

		// Act
		var newRowVersion = await _apiClient.UpdateUserType(request);

		// Assert
		var retAppUser = _db.AppUser.Find(appUser.Id);
		Assert.Equal(retAppUser.UserType, appUser.UserType);
	}

	[Fact]
	public async Task UpdateGroupCode_Success()
	{
		// Arrange
		var appUser = _db.AppUser.Skip(RndInt(0, _db.AppUser.ToList().Count)).First();
		var request = new UpdateGroupCodeReq {
			Id = appUser.Id,
			RowVersion = appUser.RowVersion,
			GroupCode = RndInt()
		};

		// Act
		var newRowVersion = await _apiClient.UpdateGroupCode(request);

		// Assert
		var retAppUser = _db.AppUser.Find(appUser.Id);
		Assert.Equal(retAppUser.GroupCode, appUser.GroupCode);
	}

	[Fact]
	public async Task UpdateName_Success()
	{
		// Arrange
		var appUser = _db.AppUser.Skip(RndInt(0, _db.AppUser.ToList().Count)).First();
		var request = new UpdateNameReq {
			Id = appUser.Id,
			RowVersion = appUser.RowVersion,
			FirstName = RndStr(100),
			LastName = RndStr(100)
		};

		// Act
		var newRowVersion = await _apiClient.UpdateName(request);

		// Assert
		var retAppUser = _db.AppUser.Find(appUser.Id);
		Assert.Equal(retAppUser.FirstName, appUser.FirstName);
		Assert.Equal(retAppUser.LastName, appUser.LastName);
	}

	#endregion

	// Helper Methods

	private AppUser CreateAppUser()
	{
		return new AppUser {
			Id = Guid.NewGuid(),
			IsEnabled = RndBool(),
			FirstName = RndStr(100),
			LastName = RndStr(100),
			Email = RndStr(200),
			ExtId = RndStr(68),
			UserType = RndEnum<UserType>()
		};
	}


}

