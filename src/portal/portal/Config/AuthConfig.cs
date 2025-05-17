
namespace Dyvenix.Portal.Config;

public class AuthConfig
{
	public bool Enabled { get; set; }
	public string AllowedOrigins { get; set; }
	public AzureAdConfig AzureAdConfig { get; set; }
	public string Scope { get; set; }

	//// Non-serialized fields/properties

	//[JsonIgnore]
	//private string[]_allScopes;

	//public string[] AllScopes
	//{
	//	get {
	//		if (_allScopes == null) {
	//			var allScopes = new List<string>();
	//			if (ApiScopes != null) {
	//				allScopes.AddRange(ApiScopes);
	//			}
	//			_allScopes = allScopes.ToArray();
	//		}
	//		return _allScopes;
	//	}
	//}
}
