//using Dyvenix.Auth.Core.Models;
//using Microsoft.Extensions.Caching.Memory;
//using System;
//using System.Threading.Tasks;
//using Dyvenix.Auth.ApiClients;

//namespace Dyvenix.Common.Api.Auth;

//public interface IUserApiTokenProvider
//{
//	Task<ApiToken> GetApiToken(string id);
//	Task<string> GetApiTokenJson(string id);
//}

//public abstract class UserApiTokenProvider : ClientApiTokenProvider, IUserApiTokenProvider
//{
//	private readonly IAccessRolesApiClient _accessRolesApiClient;

//	#region Ctors / Init

//	public UserApiTokenProvider(IMemoryCache cache, AuthConfig authConfig, IOAuthTokenProvider oAuthTokenProvider, IAccessRolesApiClient accessRolesApiClient) :
//		base(cache, authConfig, oAuthTokenProvider)
//	{
//		_accessRolesApiClient = accessRolesApiClient;
//	}

//	#endregion

//	protected override async Task<ApiToken> BuildToken(string id)
//	{
//		var roles = await _accessRolesApiClient.GetAccessRolesForUser(id);
//		if (roles == null)
//			throw new InvalidOperationException($"Failed to retrieve roles for user ID: {id}");

//		return new ApiToken {
//			ClientType = ApiTokenClientType.Client,
//			ClientId = id,
//			Roles = roles.ToArray()
//		};
//	}
//}
