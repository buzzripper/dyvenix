using System.Collections.Generic;

namespace Dyvenix.Common.Api;

public class ApiClientsConfig : Dictionary<string, ApiClientConfig>
{
}	

public class ApiClientConfig
{
	public string BaseUrl { get; set; }
	public int TImeoutSecs { get; set; }
}
