[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace Dyvenix.Server.Tests.Integration;


[CollectionDefinition("Global Collection")]
public class GlobalCollection : ICollectionFixture<GlobalTestFixture>
{
	// No code needed here, xUnit uses this to associate tests with the fixture.
}
