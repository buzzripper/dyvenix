using Dyvenix.App1.Portal.Models;
using Dyvenix.Auth.Models;
using Dyvenix.Auth.Services;
using System.Threading.Tasks;

namespace Dyvenix.App1.Portal.Auth;

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
