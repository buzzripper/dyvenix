using System.Collections.Generic;

namespace Dyvenix.Auth.Models
{
	public class AuthorizationClaims : Dictionary<string, string>
	{
		public AuthorizationClaims() : base()
		{ }

		public AuthorizationClaims(string appId, string identityId) : base()
		{
			AppId = appId;
			IdentityId = identityId;
		}

		public string AppId { get; set; }
		public string IdentityId { get; set; }
	}
}
