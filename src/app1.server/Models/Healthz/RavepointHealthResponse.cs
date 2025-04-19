using System.Text.Json.Serialization;

namespace Dyvenix.App1.Server.Models.Healthz
{
	public class RavepointHealthResponse
	{
		[JsonPropertyName("status")]
		public string Status { get; set; }

		[JsonPropertyName("db_connection")]
		public string DbConnection { get; set; }

		[JsonPropertyName("app_version")]
		public string AppVersion { get; set; }

		[JsonPropertyName("db_version")]
		public string DbVersion { get; set; }
	}
}
