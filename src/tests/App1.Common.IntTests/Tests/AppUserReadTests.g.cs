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
using Dyvenix.App1.Tests.Common;
using Dyvenix.App1.Tests.Common.Data;

namespace Dyvenix.App1.Common.IntTests.Tests;

#region Fixture

public class AppUserReadTestsFixture : IDisposable
{
	public AppUserReadTestsFixture()
	{
		ServerApiFactory = new ServerApiFactory();
		ServiceProvider = ServerApiFactory.Services;

		var dataManager = ServiceProvider.GetRequiredService<IDataManager>();

		// Reset db here once for this class and cache the test data, because all tests are reading data only, no inserts/updates/deletes
		this.DataSet = dataManager.ResetDataSet(DataSetType.Default).GetAwaiter().GetResult();

		this.AppUserApiClient = ServiceProvider.GetRequiredService<IAppUserApiClient>();
	}

	public ServerApiFactory ServerApiFactory { get; private set; }
	public IServiceProvider ServiceProvider { get; }

	public IAppUserApiClient AppUserApiClient { get; }
	public DataSet DataSet { get; }

	public void Dispose()
	{
		ServerApiFactory.Dispose();
	}
}

#endregion

[Collection("Global Collection")]
public class AppUserReadTests : TestBase, IClassFixture<AppUserReadTestsFixture>, IDisposable
{
	private static readonly Random _random = new Random();

	#region Fields

	private readonly IAppUserApiClient _apiClient;
	private readonly DataSet _ds;
	private readonly ITestOutputHelper _output;

	#endregion

	#region Ctors / Init

	public AppUserReadTests(AppUserReadTestsFixture classFixture, ITestOutputHelper output)
	{
		_apiClient = classFixture.AppUserApiClient;
		_ds = classFixture.DataSet;
		_output = output;
	}

	public void Dispose()
	{
	}

	#endregion

	#region Read - Single

	[Fact]
	public async Task GetById_Success()
	{
		var dsAppUser = _ds.AppUser.First();
		var appUser = await _apiClient.GetById(dsAppUser.Id);
		Assert.Equal(dsAppUser.Id, appUser.Id);
	}

	[Fact]
	public async Task GetById_NotFound()
	{
		var appUser = await _apiClient.GetById(Guid.Empty);
		Assert.Null(appUser);
	}

	[Fact]
	public async Task GetByIdwClaims_Success()
	{
		var dsAppUser = _ds.AppUser.First();
		var appUser = await _apiClient.GetByIdwClaims(dsAppUser.Id);
		Assert.Equal(dsAppUser.Id, appUser.Id);
	}

	[Fact]
	public async Task GetByIdwClaims_NotFound()
	{
		var appUser = await _apiClient.GetByIdwClaims(Guid.Empty);
		Assert.Null(appUser);
	}

	#endregion

	#region Read - List

	[Fact]
	public async Task GetAll()
	{
		var appUser = await _apiClient.GetAll();
		Assert.Equal(_ds.AppUser.Count, appUser.Count);
	}

	// ReadMethod1() - UserType:Good
	[Fact]
	public async Task ReadMethod1_01()
	{
		// Arrange
		var dsAppUser = _ds.AppUser.First();
		var dsAppUsers = _ds.AppUser.Where(x => x.UserType == dsAppUser.UserType).ToList();

		// Act
		var appUsers = await _apiClient.ReadMethod1(userType: dsAppUser.UserType);

		// Assert
		Assert.Equal(dsAppUsers.Count, appUsers.Count);
	}

	#endregion

}

