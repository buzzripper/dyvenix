using System;

namespace Dyvenix.Core.Exceptions;

public class ApiException : Exception
{
	#region Fields

	private int _statusCode;

	#endregion

	#region Ctors / Init

	public ApiException() : base() { }

	public ApiException(string message) : base(message) { }

	public ApiException(string message, Exception innerException) : base(message, innerException) { }

	public ApiException(string message, string correlationId) : this(message)
	{
		CorrelationId = correlationId;
	}

	// Not for subclasses

	public ApiException(int statusCode, string message) : this(message)
	{
		this.StatusCode = statusCode;
	}

	public ApiException(int statusCode, string message, Exception innerException) : this(message, innerException)
	{
		this.StatusCode = statusCode;
	}

	public ApiException(int statusCode, string message, string correlationId) : this(message, correlationId)
	{
		this.StatusCode = statusCode;
	}

	#endregion

	#region Properties

	public int StatusCode
	{
		get {
			return GetStatusCode();
		}
		private set {
			_statusCode = value;
		}
	}

	public string CorrelationId { get; set; }

	#endregion

	#region Methods

	protected virtual int GetStatusCode()
	{
		return _statusCode;
	}

	#endregion
}
