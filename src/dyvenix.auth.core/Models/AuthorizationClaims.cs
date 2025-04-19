using System.Collections.Generic;

namespace Dyvenix.Auth.Core.Models
{
	public class AuthorizationClaims : Dictionary<string, string>
	{
		public AuthorizationClaims() : base()
		{ }

		public AuthorizationClaims(string appId, string identityId) : base()
		{
			this.AppId = appId;
			this.IdentityId = identityId;
		}

		public string AppId { get; set; }
		public string IdentityId { get; set; }
	}
}
