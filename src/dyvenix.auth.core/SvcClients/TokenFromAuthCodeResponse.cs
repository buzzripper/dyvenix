using System.Text.Json.Serialization;

namespace Dyvenix.Auth.Core.SvcClients;

public class TokenFromAuthCodeResponse
{
	[JsonPropertyName("id_token")]
	public string IdToken { get; set; }

	[JsonPropertyName("token_type")]
	public string TokenType { get; set; }

	[JsonPropertyName("not_before")]
	public int NotBefore { get; set; }

	[JsonPropertyName("id_token_expires_in")]
	public int IdTokenExpiresInSecs { get; set; }

	[JsonPropertyName("profile_info")]
	public string ProfileInfo { get; set; }

	[JsonPropertyName("scope")]
	public string Scope { get; set; }

	[JsonPropertyName("refresh_token")]
	public string RefreshToken { get; set; }

	[JsonPropertyName("refresh_token_expires_in")]
	public int RefreshTokenExpiresInSecs { get; set; }
}
