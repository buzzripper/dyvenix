using System.Collections.Generic;

namespace Dyvenix.Portal.Auth;

public class AccessClaimsToken
{
    public int CallerType { get; set; } // 1 = user, 2 = client
    public string CallerId { get; set; }
    public List<AccessClaim> AccessClaims { get; set; } = new();
}
