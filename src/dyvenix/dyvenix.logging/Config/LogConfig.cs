
namespace Dyvenix.Logging.Config;

public class LogConfig
{
	public string ApplicationName { get; set; }

	// Console
	public bool EnableConsoleLogging { get; set; }
	public string ConsoleLogLevel { get; set; }

	// File
	public bool EnableFileLogging { get; set; }
	public string FileLogLevel { get; set; }
	public string FilePath { get; set; }

	// Database
	public bool EnableDbLogging { get; set; }
	public string DbLogLevel { get; set; }
	public string DbConnectionString { get; set; }
	public string Schema { get; set; }
	public string TableName { get; set; }
	public int BatchPostingLimit { get; set; }

	public string SelfLogPath { get; set; }

	//public void ProcessEnvironmentVars()
	//{
	//	//this.EnvName = ConfigUtils.Replace(ConfigConst.EV_ENVNAME, this.EnvName);
	//}
}
