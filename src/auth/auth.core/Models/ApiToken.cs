using System;

namespace Dyvenix.Auth.Core.Models;

public class ApiToken
{
	public ApiTokenClientType ClientType { get; set; }
	public string ClientId { get; set; }
	public string[] Roles { get; set; } = Array.Empty<string>();
}
