using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Dyvenix.Core.ApiClients;
using Microsoft.AspNetCore.Mvc;

namespace Dyvenix.AppSvr.Common.ApiClients;

public interface IAccessRolesApiClient
{
	Task<ActionResult<List<string>>> GetAccessRolesForUser(Guid userId);
}

public class AccessRolesApiClient : ApiClientBase, IAccessRolesApiClient
{
    public AccessRolesApiClient(HttpClient httpClient)
        : base(httpClient)
    {
    }

	public async Task<ActionResult<List<string>>> GetAccessRolesForUser(Guid userId)
	{
		return await GetAsync<List<string>>("api/v1/AppUser/CreateAppUser");
	}
}
