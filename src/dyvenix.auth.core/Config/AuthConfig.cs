namespace Dyvenix.Auth.Core.Config;

public class AuthConfig
{
	public const string cEV_Enabled = "EV_AUTHCONFIG_ENABLED";
	public const string cEV_AllowedOrigins = "EV_AUTHCONFIG_ALLOWEDORIGINS";

	public bool Enabled { get; set; }
	public string AllowedOrigins { get; set; }
	public B2CConfig AzureAdB2C { get; set; }
}
