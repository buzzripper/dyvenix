
namespace Dyvenix.Common.Api;

public class AuthConfig
{
	public bool Enabled { get; set; }
	public string AllowedOrigins { get; set; }
	public AzureAdConfig IdP { get; set; }
	public string Scope { get; set; }
}
