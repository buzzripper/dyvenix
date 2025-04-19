using Dyvenix.App1.Server.Models;
using Dyvenix.Auth.Core.Models;
using Dyvenix.Auth.Core.Services;
using System.Threading.Tasks;

namespace Dyvenix.App1.Server.Auth;

public class AccessClaimsProvider : IAccessClaimsProvider
{
	public Task<AuthorizationClaims> GetAccessClaims(string IdentityId)
	{



		var result = new AuthorizationClaims {
			AppId = AppConst.AppId,
			IdentityId = IdentityId
		};

		return null;
	}
}
