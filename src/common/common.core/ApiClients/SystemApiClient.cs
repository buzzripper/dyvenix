using Dyvenix.Core.ApiClients;
using System.Net.Http;
using System.Threading.Tasks;

namespace Dyvenix.Auth.ApiClients;

public interface ISystemApiClient
{
	Task<string> Healthz();
}

public class SystemApiClient : ApiClientBase, ISystemApiClient
{
    public SystemApiClient(HttpClient httpClient) : base(httpClient)
    {
    }

	public async Task<string> Healthz()
	{
		return await GetAsync<string>("v1/System/Healthz");
	}
}
