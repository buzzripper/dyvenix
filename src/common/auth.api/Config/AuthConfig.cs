namespace Dyvenix.Auth.Api.Config;

public class AuthConfig
{
	public bool Enabled { get; set; }
	public string Authority { get; set; }
	public string Audience { get; set; }
	public bool RequireHttpsMetadata { get; set; }
}
