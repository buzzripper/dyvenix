using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Dyvenix.Auth.Config;

public class AuthConfig
{
	public bool Enabled { get; set; }
	public string AllowedOrigins { get; set; }
	public B2CConfig AzureAdB2C { get; set; }
	public List<string> ApiScopes { get; set; }
	public string ApiConnectorUsername { get; set; }
	public string ApiConnectorPassword { get; set; }

	// Non-serialized fields/properties

	[JsonIgnore]
	private string[]_allScopes;

	public string[] AllScopes
	{
		get {
			if (_allScopes == null) {
				var allScopes = new List<string>();
				if (AzureAdB2C?.Scopes != null) {
					allScopes.AddRange(AzureAdB2C.Scopes);
				}
				if (ApiScopes != null) {
					allScopes.AddRange(ApiScopes);
				}
				_allScopes = allScopes.ToArray();
			}
			return _allScopes;
		}
	}
}
