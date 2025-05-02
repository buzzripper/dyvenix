using Dyvenix.Auth.Models;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Services;

public interface IAccessClaimsProvider
{
	Task<AuthorizationClaims> GetAccessClaims(string extAppUserId);
}
