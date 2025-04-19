using System.Collections.Generic;

namespace Dyvenix.App1.Server.Models.Healthz
{
	public class HealthStatus
	{
		public string Status { get; set; }
		public string Environment { get; set; }
		public string AppVersion { get; set; }
		public Dictionary<string, ServerStatus> CallManagerStatuses { get; set; } = new Dictionary<string, ServerStatus>();
	}

	public class ServerStatus
	{
		public string DatabaseStatus { get; set; } = "unknown";
		public string GrpcStatus { get; set; } = "unknown";
		public string WebSiteHealth { get; set; } = "unknown";
	}
}
