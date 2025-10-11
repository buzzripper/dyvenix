using System.Threading;

namespace Dyvenix.Logging.Correlation;

public static class CorrelationContext
{
	private static readonly AsyncLocal<string> _correlationId = new();

	public static string CorrelationId
	{
		get => _correlationId.Value;
		set => _correlationId.Value = value;
	}
}

