using System.Collections.Generic;

namespace Dyvenix.Bff.Config;

public class AuthConfig
{
	public bool Enabled { get; set; }
	public string AllowedOrigins { get; set; }
	public AzureAdConfig AzureAd { get; set; }
	public string Scope { get; set; }
}
