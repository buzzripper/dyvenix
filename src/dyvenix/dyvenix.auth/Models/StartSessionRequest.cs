namespace Dyvenix.Auth.Models;

public class StartSessionRequest
{
	public string AuthCode { get; set; }
	public string CodeVerifier { get; set; }
}
