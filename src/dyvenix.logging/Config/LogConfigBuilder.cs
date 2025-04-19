using Dyvenix.Logging.Enrichers;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.MSSqlServer;
using System;
using System.Collections.ObjectModel;
using System.Data;
using System.Diagnostics;
using System.IO;

namespace Dyvenix.Logging.Config
{
	public class LogConfigBuilder
	{
		private const string cOutputTemplate = "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff}][{LogLevel}] {Message:lj}[{Source}]{NewLine}{Exception}";

		public LoggerConfiguration Build(LogConfig logConfig)
		{
			// Replace config values with env variables if running on a server
			//logConfig.ProcessEnvironmentVars();

			ValidateConfig(logConfig);

			var loggerConfiguration = new LoggerConfiguration().Enrich.FromLogContext();
			loggerConfiguration.Enrich.FromLogContext();
			loggerConfiguration.Enrich.With(new DyvenixLogEnricher(logConfig.ApplicationName));
			loggerConfiguration.MinimumLevel.Verbose();
			loggerConfiguration.MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning);
			loggerConfiguration.MinimumLevel.Override("Microsoft.AspNetCore", Serilog.Events.LogEventLevel.Error);

			if (logConfig.EnableConsoleLogging) {
				loggerConfiguration.WriteTo.Console
				(
					restrictedToMinimumLevel: GetLogEventLevel(logConfig.ConsoleLogLevel),
					outputTemplate: cOutputTemplate
				);
			}

			if (logConfig.EnableFileLogging) {
				loggerConfiguration.WriteTo.File
				(
					path: logConfig.FilePath,
					restrictedToMinimumLevel: GetLogEventLevel(logConfig.FileLogLevel),
					outputTemplate: cOutputTemplate
				);
			}

			if (logConfig.EnableDbLogging) {
				loggerConfiguration.WriteTo.MSSqlServer
				(
					logConfig.DbConnectionString,
					new MSSqlServerSinkOptions {
						TableName = logConfig.TableName,
						SchemaName = logConfig.Schema,
						AutoCreateSqlTable = true,
						BatchPostingLimit = logConfig.BatchPostingLimit
					},
					sinkOptionsSection: null,
					appConfiguration: null,
					restrictedToMinimumLevel: GetLogEventLevel(logConfig.DbLogLevel),
					formatProvider: null,
					columnOptions: BuildColumnOptions(),
					columnOptionsSection: null,
					logEventFormatter: null
				);
			}

			if (!string.IsNullOrWhiteSpace(logConfig.SelfLogPath)) {
				try {
					var file = File.CreateText(logConfig.SelfLogPath);
					Serilog.Debugging.SelfLog.Enable(TextWriter.Synchronized(file));

				} catch (Exception ex) {
					Debug.Print($"{ex.GetType().Name} attempting to create self log file: {ex.Message}");
				}				
			}

			return loggerConfiguration;
		}

		private void ValidateConfig(LogConfig logConfig)
		{
			if (logConfig.EnableFileLogging) {
				if (string.IsNullOrWhiteSpace(logConfig.FilePath))
					throw new ArgumentException("File path is required when file logging is enabled.");
			}

			if (logConfig.EnableDbLogging) {
				if (string.IsNullOrWhiteSpace(logConfig.DbConnectionString))
					throw new ArgumentException("Database connection string is required when database logging is enabled.");

				if (string.IsNullOrWhiteSpace(logConfig.Schema))
					logConfig.Schema = "dbo";

				if (string.IsNullOrWhiteSpace(logConfig.TableName))
					throw new ArgumentException("Table name is required when database logging is enabled.");
			}
		}

		private LogEventLevel GetLogEventLevel(string logLevel)
		{
			LogEventLevel result = logLevel switch {
				"Verbose" => LogEventLevel.Verbose,
				"Debug" => LogEventLevel.Debug,
				"Information" => LogEventLevel.Information,
				"Warning" => LogEventLevel.Warning,
				"Error" => LogEventLevel.Error,
				"Fatal" => LogEventLevel.Fatal,
				_ => LogEventLevel.Information,
			};

			return result;
		}

		private ColumnOptions BuildColumnOptions()
		{
			var columnOptions = new ColumnOptions {
				TimeStamp =
				{
					ColumnName = "Timestamp",
					ConvertToUtc = true,
				},
				Level =
				{
					DataLength = 12
				},
				AdditionalColumns = new Collection<SqlColumn>
				{
					new SqlColumn { ColumnName = "LogLevel", DataType = SqlDbType.Int },
					new SqlColumn { ColumnName = "Application", DataType = SqlDbType.NVarChar, DataLength=200 },
					new SqlColumn { ColumnName = "Source", DataType = SqlDbType.NVarChar, DataLength=200 },
					new SqlColumn { ColumnName = "CorrelationId", DataType = SqlDbType.NVarChar, DataLength=50 },
				}
			};
			columnOptions.Store.Remove(StandardColumn.Level);
			columnOptions.Store.Remove(StandardColumn.Properties);
			columnOptions.Store.Remove(StandardColumn.MessageTemplate);

			return columnOptions;
		}
	}
}
