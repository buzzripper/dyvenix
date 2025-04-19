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

public class AccessClaimUpdateTestsFixture : IDisposable
{
	public AccessClaimUpdateTestsFixture()
	{
		ServerApiFactory = new ServerApiFactory();
		ServiceProvider = ServerApiFactory.Services;
	}

	public ServerApiFactory ServerApiFactory { get; private set; }
	public IServiceProvider ServiceProvider { get; }

	public IAccessClaimApiClient AccessClaimApiClient { get; }
	public IDataManager DataManager { get; }

	public void Dispose()
	{
		ServerApiFactory.Dispose();
	}
}

#endregion

[Collection("Global Collection")]
public class AccessClaimUpdateTests : TestBase, IClassFixture<AccessClaimUpdateTestsFixture>, IDisposable
{
	#region Fields

	private readonly AccessClaimUpdateTestsFixture _classFixture;
	private readonly IAccessClaimApiClient _apiClient;
	private readonly ITestOutputHelper _output;
	private readonly Db _db;
	private readonly IDataManager _dataManager;

	#endregion

	#region Ctors / Init

	public AccessClaimUpdateTests(AccessClaimUpdateTestsFixture classFixture, ITestOutputHelper output)
	{
		_classFixture = classFixture;
		_output = output;

		_apiClient = classFixture.ServiceProvider.GetRequiredService<IAccessClaimApiClient>();
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
		var accessClaim = CreateAccessClaim();
		// Act
		var newId = await _apiClient.CreateAccessClaim(accessClaim);
		// Assert
		Assert.Equal(accessClaim.Id, newId);
		var retAccessClaim = await _db.AccessClaim.FindAsync(newId);
		Assert.NotNull(retAccessClaim);
		Assert.Equal(newId, retAccessClaim.Id);
	}

	[Fact]
	public async Task Create_InvalidId()
	{
		// Arrange
		var accessClaim = CreateAccessClaim();
		accessClaim.Id = Guid.Empty;

		// Act
		var newId = await _apiClient.CreateAccessClaim(accessClaim);

		// Assert
		Assert.NotEqual(Guid.Empty, newId);
		var retAccessClaim = await _db.AccessClaim.FindAsync(newId);
		Assert.NotNull(retAccessClaim);
		Assert.Equal(newId, retAccessClaim.Id);
	}

	[Fact]
	public async Task Create_NullAccessClaim()
	{
		// Act / Assert
		await Assert.ThrowsAsync<ArgumentNullException>(async () => await _apiClient.CreateAccessClaim(null));
	}

	#endregion

	#region Delete

	[Fact]
	public async Task Delete_Success()
	{
		// Arrange
		var ds = await _dataManager.ResetDataSet(DataSetType.Default);
		var accessClaim = ds.AccessClaim.Skip(RndInt(0, ds.AccessClaim.ToList().Count)).First();
		var id = accessClaim.Id;

		// Act
		var result = await _apiClient.DeleteAccessClaim(id);

		// Assert
		Assert.True(result);
	}

	[Fact]
	public async Task Delete_NotFound()
	{
		// Arrange
		var id = Guid.NewGuid();

		// Act
		var result = await _apiClient.DeleteAccessClaim(id);

		// Assert
		Assert.False(result);
	}

	#endregion

	#region Update

	[Fact]
	public async Task FullUpdate_Success()
	{
		// Arrange
		var accessClaim = _db.AccessClaim.Skip(RndInt(0, _db.AccessClaim.ToList().Count)).First();
		accessClaim.ClaimName = RndStr(100);
		accessClaim.ClaimValue = RndStr(200);

		// Act
		await _apiClient.UpdateAccessClaim(accessClaim);

		// Assert
		var retAccessClaim = _db.AccessClaim.Find(accessClaim.Id);
		Assert.Equal(retAccessClaim.Id, accessClaim.Id);
		Assert.Equal(retAccessClaim.ClaimName, accessClaim.ClaimName);
		Assert.Equal(retAccessClaim.ClaimValue, accessClaim.ClaimValue);
	}

	[Fact]
	public async Task UpdateClaimName_Success()
	{
		// Arrange
		var accessClaim = _db.AccessClaim.Skip(RndInt(0, _db.AccessClaim.ToList().Count)).First();
		var request = new UpdateClaimNameReq {
			Id = accessClaim.Id,
			RowVersion = accessClaim.RowVersion,
			ClaimName = RndStr(100)
		};

		// Act
		var newRowVersion = await _apiClient.UpdateClaimName(request);

		// Assert
		var retAccessClaim = _db.AccessClaim.Find(accessClaim.Id);
		Assert.Equal(retAccessClaim.ClaimName, accessClaim.ClaimName);
	}

	#endregion

	// Helper Methods

	private AccessClaim CreateAccessClaim()
	{
		return new AccessClaim {
			Id = Guid.NewGuid(),
			ClaimName = RndStr(100),
			AppUserId = GetRndAppUserPk()
		};
	}

	private Guid GetRndAppUserPk()
	{
		var appUserList = _db.AppUser.ToList();
		return appUserList.Skip(RndInt(1, appUserList.Count)).First().Id;
	}


}

