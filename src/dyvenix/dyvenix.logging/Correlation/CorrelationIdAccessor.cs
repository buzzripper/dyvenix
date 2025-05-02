using Microsoft.AspNetCore.Http;

namespace Dyvenix.Logging.Correlation;

public interface ICorrelationIdAccessor
{
	string GetCorrelationId();
}

public class CorrelationIdAccessor : ICorrelationIdAccessor
{
	private readonly IHttpContextAccessor _httpContextAccessor;

	public CorrelationIdAccessor(IHttpContextAccessor httpContextAccessor)
	{
		_httpContextAccessor = httpContextAccessor;
	}

	public string GetCorrelationId()
	{
		return _httpContextAccessor.HttpContext?.Items["CorrelationId"] as string;
	}
}
