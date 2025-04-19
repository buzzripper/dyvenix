using Dyvenix.App1.Data.Config;
using Dyvenix.Auth.Core.Config;
using Dyvenix.Logging.Config;

namespace Dyvenix.App1.Server.Config
{
	public partial class AppConfig
	{
		public DataConfig DataConfig { get; set; }
		public AuthConfig AuthConfig { get; set; }
		public LogConfig LogConfig { get; set; }
	}
}
