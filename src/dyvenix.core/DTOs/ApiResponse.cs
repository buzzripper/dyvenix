
namespace Dyvenix.Core.DTOs;

public class ApiResponse
{
	#region Ctors / Init

	public ApiResponse()
	{
		this.StatusCode = 0;
		this.Message = "Success";
	}

	public ApiResponse(string message)
	{
		this.Message = message;
	}

	public ApiResponse(int statusCode, string message)
	{
		this.StatusCode = statusCode;
		this.Message = message;
	}

	public ApiResponse(string message, string correlationId)
	{
		this.Message = message;
		this.CorrelationId = correlationId;
	}

	public ApiResponse(int statusCode, string message, string correlationId)
	{
		this.StatusCode = statusCode;
		this.Message = message;
		this.CorrelationId = correlationId;
	}

	#endregion

	#region Properties

	public int StatusCode { get; set; }
	public string Message { get; set; }
	public string CorrelationId { get; set; }

	#endregion
}

public class ApiResponse<T>
{
	public ApiResponse()
	{
		this.StatusCode = 0;
		this.Message = "Success";
	}

	public ApiResponse(string message)
	{
		this.Message = message;
	}

	public ApiResponse(int statusCode, string message)
	{
		this.StatusCode = statusCode;
		this.Message = message;
	}

	public ApiResponse(string message, string correlationId)
	{
		this.Message = message;
		this.CorrelationId = correlationId;
	}

	public ApiResponse(int statusCode, string message, string correlationId)
	{
		this.StatusCode = statusCode;
		this.Message = message;
		this.CorrelationId = correlationId;
	}

	#region Properties

	public int StatusCode { get; set; }
	public string Message { get; set; }
	public string CorrelationId { get; set; }
	public T Data { get; set; }

	#endregion
}


//public class ApiResponse<T> : ApiResponse
//{
//	public ApiResponse() { }

//	public ApiResponse(string message) : base(message) { }

//	public ApiResponse(int statusCode, string message) : base(statusCode, message) { }

//	public ApiResponse(string message, string correlationId) : base(message, correlationId) { }

//	public ApiResponse(int statusCode, string message, string correlationId) : base(statusCode, message, correlationId) { }

//	#region Properties

//	public T Data { get; set; }

//	#endregion
//}
