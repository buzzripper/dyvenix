using Dyvenix.Auth.Core.Models;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core.Services;

public interface IAccessClaimsProvider
{
	Task<AuthorizationClaims> GetAccessClaims(string extAppUserId);
}
