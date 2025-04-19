using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Xunit.Abstractions;
using Dyvenix.App1.Data.Config;
using Dyvenix.App1.Tests.Common.Data;

namespace Dyvenix.App1.Common.IntTests.Tests;

#region Fixture

public class DataSetupTestsFixture : IDisposable
{
	public DataSetupTestsFixture()
	{
		var basePath = Directory.GetCurrentDirectory();
		var configuration = new ConfigurationBuilder()
			.SetBasePath(basePath)
			.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
			.Build();

		var dataConfig = configuration.GetSection(nameof(DataConfig)).Get<DataConfig>();

		var services = new ServiceCollection();

		// Register your services here
		services.AddDyvenixDataServices(dataConfig);
		services.AddSingleton<IDataManager, DataManager>();

		this.ServiceProvider = services.BuildServiceProvider();
	}

	public IServiceProvider ServiceProvider { get; }

	public void Dispose()
	{
	}
}

#endregion

public class DataSetupTests : IClassFixture<DataSetupTestsFixture>, IDisposable
{
	#region Fields

	private readonly IServiceProvider _serviceProvider;
	private readonly ITestOutputHelper _output;
	#endregion

	#region Ctors / Init

	public DataSetupTests(DataSetupTestsFixture classFixture, ITestOutputHelper output)
	{
		_serviceProvider = classFixture.ServiceProvider;
		_output = output;
	}

	public void Dispose()
	{

	}

	#endregion

	[Fact(Skip = "Not part of test suite, this is a utility test for populating actual database.")]
	public async Task SetupData()
	{
		using var dataMgr = _serviceProvider.GetService<IDataManager>();
		var appUsersToCreate = await dataMgr.ResetDataSet(DataSetType.Default);

		_output.WriteLine("Done!");
	}
}

