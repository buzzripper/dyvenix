using System.Collections.Generic;

namespace Dyvenix.Auth.Core.Models;

public class DyvAccessToken
{
	public int CallerType { get; set; } // 1 = user, 2 = client
	public string CallerId { get; set; }
	public List<string> Roles { get; set; } = new();
}
