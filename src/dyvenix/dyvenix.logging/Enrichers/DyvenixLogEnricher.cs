using Dyvenix.Logging.Correlation;
using Serilog.Core;
using Serilog.Events;

namespace Dyvenix.Logging.Enrichers;

public class DyvenixLogEnricher : ILogEventEnricher
{
    private readonly string _applicationName;

	public DyvenixLogEnricher(string applicationName)
    {
        _applicationName = applicationName;
    }

    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        SetLogLevel(logEvent, propertyFactory);
        SetApplication(logEvent, propertyFactory);
        SetCorrelationId(logEvent, propertyFactory);
	}

    private void SetLogLevel(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
	{
		var levelValue = (int)logEvent.Level;
		var levelProperty = new LogEventProperty("LogLevel", new ScalarValue(levelValue));
		logEvent.AddPropertyIfAbsent(levelProperty);
	}

    private void SetApplication(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
	{
		logEvent.AddPropertyIfAbsent(new LogEventProperty("Application", new ScalarValue(_applicationName)));
	}

    public void SetCorrelationId(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
		var correlationId = CorrelationContext.CorrelationId;
        if (!string.IsNullOrEmpty(correlationId))
            logEvent.AddPropertyIfAbsent(propertyFactory.CreateProperty("CorrelationId", correlationId));
    }
}
