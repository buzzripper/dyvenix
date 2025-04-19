namespace Dyvenix.Auth.Core.Models;

public class StartSessionRequest
{
	public string AuthCode { get; set; }
	public string CodeVerifier { get; set; }
}
