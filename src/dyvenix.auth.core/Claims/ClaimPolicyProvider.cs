using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core.Claims;

public class ClaimPolicyProvider : DefaultAuthorizationPolicyProvider
{
    public ClaimPolicyProvider(IOptions<AuthorizationOptions> options) : base(options) 
    { }

    public override Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
    {
        var parts = policyName.Split(':');
        if (parts.Length == 2)
        {
            var claimType = parts[0];
            var claimValue = parts[1];

            var policy = new AuthorizationPolicyBuilder()
                .RequireClaim(claimType, claimValue)
                .Build();

            return Task.FromResult(policy);
        }

        return base.GetPolicyAsync(policyName);
    }
}
