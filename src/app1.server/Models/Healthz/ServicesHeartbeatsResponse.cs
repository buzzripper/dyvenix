using System.Collections.Generic;

namespace Dyvenix.App1.Server.Models.Healthz
{
	public class ServicesHeartbeatsResponse
	{
		public string Status { get; set; }

		public string Server { get; set; }

		public string Environment { get; set; }

		public IEnumerable<ServiceHeartbeatDetails> servicesHeartbeats { get; set; }
	}
}
