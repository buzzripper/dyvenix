using Dyvenix.Core.ApiClients;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Dyvenix.Auth.ApiClients;

public interface IAccessRolesApiClient
{
	Task<List<string>> GetAccessRolesForUser(Guid userId);
}

public class AccessRolesApiClient : ApiClientBase, IAccessRolesApiClient
{
    public AccessRolesApiClient(HttpClient httpClient) : base(httpClient)
    {
    }

	public async Task<List<string>> GetAccessRolesForUser(Guid userId)
	{
		return await GetAsync<List<string>>("api/v1/AppUser/CreateAppUser");
	}
}
