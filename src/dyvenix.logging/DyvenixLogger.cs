using Dyvenix.Logging.Correlation;
using Serilog;
using System;

namespace Dyvenix.Logging;

public interface IDyvenixLogger<T>
{
	void Verbose(string message);
	void Debug(string message);
	void Info(string message);
	void Warn(string message);
	void Error(string message);
	void Error(Exception ex, string message);
	void Fatal(string message);

	string CorrelationId { get; }
}

public class DyvenixLogger<T> : IDyvenixLogger<T>
{
	private readonly ILogger _logger;
	private readonly ICorrelationIdAccessor _correlationIdAccessor;

	public DyvenixLogger(ICorrelationIdAccessor correlationIdAccessor)
	{
		_logger = Log.ForContext("Source", typeof(T).Name);
		_correlationIdAccessor = correlationIdAccessor;
	}

	public void Verbose(string message)
	{
		_logger.Verbose(message);
	}

	public void Debug(string message)
	{
		_logger.Debug(message);
	}

	public void Info(string message)
	{
		_logger.Information(message);
	}

	public void Warn(string message)
	{
		_logger.Warning(message);
	}

	public void Error(string message)
	{
		_logger.Error(message);
	}

	public void Error(Exception ex, string message)
	{
		_logger.Error(ex, message);
	}

	public void Fatal(string message)
	{
		_logger.Fatal(message);
	}

	public string CorrelationId => _correlationIdAccessor?.GetCorrelationId();
}