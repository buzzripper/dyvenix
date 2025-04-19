using System;

namespace Dyvenix.App1.Server.Models.Healthz
{
	public class ServiceHeartbeatDetails
	{
		public string ServiceId { get; set; }
		public string ServiceDisplayName { get; set; }
		public DateTime? LastHeartBeatUpdatedUTC { get; set; }
		public bool IsAlive { get; set; }
	}
}
