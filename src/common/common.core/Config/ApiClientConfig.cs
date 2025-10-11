using System.Collections.Generic;

namespace Dyvenix.Common.Core;

public class ApiClientsConfig : Dictionary<string, ApiClientConfig>
{
}	

public class ApiClientConfig
{
	public string BaseUrl { get; set; }
	public int TimeoutSecs { get; set; }
}
