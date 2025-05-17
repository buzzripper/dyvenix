//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Buzzripper.Core.ApiClients;
using Buzzripper.Core.Entities;
using Dyvenix.Server.Common.Queries;
using Dyvenix.Server.Common.Entities;
using Dyvenix.Server.Common.DTOs;

namespace Dyvenix.Server.Common.ApiClients;

public interface IAccessClaimApiClient
{
	Task<Guid> CreateAccessClaim(AccessClaim accessClaim);
	Task<bool> DeleteAccessClaim(Guid id);
	Task<byte[]> UpdateAccessClaim(AccessClaim accessClaim);
	Task<byte[]> UpdateClaimName(UpdateClaimNameReq request);
}
public class AccessClaimApiClient : ApiClientBase<AccessClaim>, IAccessClaimApiClient
{
    public AccessClaimApiClient(HttpClient httpClient)
        : base(httpClient)
    {
    }

	#region Create

	public async Task<Guid> CreateAccessClaim(AccessClaim accessClaim)
	{
		ArgumentNullException.ThrowIfNull(accessClaim);

		return await PostAsync<Guid>("api/v1/AccessClaim/CreateAccessClaim", accessClaim);
	}

	#endregion

	#region Delete

	public async Task<bool> DeleteAccessClaim(Guid id)
	{
		if (id == Guid.Empty)
			throw new ArgumentNullException(nameof(id));
		return await PostAsync<bool>($"api/v1/AccessClaim/DeleteAccessClaim/{id}", null);
	}

	#endregion

	#region Update

	public async Task<byte[]> UpdateAccessClaim(AccessClaim accessClaim)
	{
		ArgumentNullException.ThrowIfNull(accessClaim);
		return await PutAsync<byte[]>("api/v1/AccessClaim/UpdateAccessClaim", accessClaim);
	}

	public async Task<byte[]> UpdateClaimName(UpdateClaimNameReq request)
	{
		return await PatchAsync<byte[]>($"api/v1/AccessClaim/UpdateClaimName", request);
	}

	#endregion




}
