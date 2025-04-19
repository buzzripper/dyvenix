using System;

namespace Dyvenix.Core.Exceptions;

public class ConcurrencyApiException : ApiException
{
	#region Ctors / Init

	public ConcurrencyApiException() : base() { }

	public ConcurrencyApiException(string message) : base(message) { }

	public ConcurrencyApiException(string message, Exception innerException) : base(message, innerException) { }

	public ConcurrencyApiException(string message, string correlationId) : base(message, correlationId) { }

	#endregion

	protected override int GetStatusCode()
	{
		return 409;
	}
}
