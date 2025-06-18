using System;

namespace Dyvenix.Common.Api;

public class AuthConfig
{
	public bool Enabled { get; set; }
	public string AllowedOrigins { get; set; }
	public AzureAdConfig AzureAd { get; set; }
	public string[] Scopes { get; set; } = Array.Empty<string>();
}
