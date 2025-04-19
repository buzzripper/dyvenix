using Microsoft.AspNetCore.Http;
using Serilog.Context;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Dyvenix.Logging.Correlation;

public class CorrelationIdMiddleware
{
	private readonly RequestDelegate _next;

	public CorrelationIdMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task Invoke(HttpContext context)
	{
		// HttpContext request/response headers
		var correlationId = context.Request.Headers[LogConstants.CorrelationHeaderName].FirstOrDefault()
							?? Guid.NewGuid().ToString();
		context.Response.Headers[LogConstants.CorrelationHeaderName] = correlationId;

		// HttpContext items
		context.Items[LogConstants.CorrelationItemName] = correlationId;
		using (LogContext.PushProperty(LogConstants.CorrelationItemName, correlationId))
		{
			await _next(context);
		}
	}
}

