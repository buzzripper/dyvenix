using System.Collections.Generic;

namespace Dyvenix.Auth.Core.Config
{
	public class B2CConfig
	{
		public string Instance { get; set; }
		public string ClientId { get; set; }
		public string TenantName { get; set; }
		public string Domain { get; set; }
		public string SignUpSignInPolicyId { get; set; }
		public string RedirectUri { get; set; }
		public List<string> Scopes { get; set; }

		public string ScopesString
		{
			get {
				return string.Join(" ", Scopes);
			}
		}
	}
}
