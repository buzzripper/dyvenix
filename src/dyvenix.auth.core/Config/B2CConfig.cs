using System;
using System.Collections.Generic;
using System.Linq;

namespace Dyvenix.Auth.Core.Config
{
	public class B2CConfig
	{
		public string Instance { get; set; }
		public string ClientId { get; set; }
		public string Domain { get; set; }
		public string SignedOutCallbackPath { get; set; }
		public string SignUpSignInPolicyId { get; set; }
		public string ResetPasswordPolicyId { get; set; }
		public string EditProfilePolicyId { get; set; }
		public string CallbackPath { get; set; }
		public string Scopes { get; set; }

		private List<string> _scopesList;
		public List<string> ScopesList
		{
			get {
				if (_scopesList == null) {
					_scopesList = Scopes?.Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList();
				}
				return _scopesList;
			}
		}
	}
}
