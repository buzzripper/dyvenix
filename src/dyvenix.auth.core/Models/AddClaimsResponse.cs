using System.Text.Json.Serialization;

namespace Dyvenix.Auth.Core.Models
{
	public class AddClaimsResponse
	{
		public const string ApiVersion = "1.0.0";

		public AddClaimsResponse()
		{
			Version = ApiVersion;
			Action = "Continue";
		}

		public AddClaimsResponse(string action, string userMessage)
		{
			Version = ApiVersion;
			Action = action;
			UserMessage = userMessage;
			if (action == "ValidationError") {
				Status = "400";
			}
		}

		[JsonPropertyName("version")]
		public string Version { get; }

		[JsonPropertyName("action")]
		public string Action { get; set; }

		[JsonPropertyName("userMessage")]
		public string UserMessage { get; set; }

		[JsonPropertyName("status")]
		public string Status { get; set; }

		[JsonPropertyName("extension_MyCustomClaim")]
		public string MyCustomClaim { get; set; } = string.Empty;

		[JsonPropertyName("extension_OtherCustomClaim")]
		public string OtherCustomClaim { get; set; } = string.Empty;
	}
}
