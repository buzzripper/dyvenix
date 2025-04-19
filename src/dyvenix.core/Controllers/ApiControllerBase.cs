using Dyvenix.Core.DTOs;
using Dyvenix.Core.Exceptions;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Dyvenix.Core.Controllers;

public class ApiControllerBase<TController> : ControllerBase
{
	#region Fields

	protected readonly IDyvenixLogger<TController> _logger;

	#endregion

	#region Ctors / Init

	public ApiControllerBase(IDyvenixLogger<TController> logger)
	{
		_logger = logger;
	}

	#endregion

	protected ApiResponse CreateApiResponse()
	{
		var apiResponse = new ApiResponse();
		apiResponse.CorrelationId = _logger.CorrelationId;
		return apiResponse;
	}

	protected ApiResponse<TData> CreateApiResponse<TData>()
	{
		var apiResponse = new ApiResponse<TData>();
		apiResponse.CorrelationId = _logger.CorrelationId;
		return apiResponse;
	}

	protected ObjectResult LogErrorAndReturnErrorResponse<TData>(ApiResponse<TData> apiResponse, Exception ex)
	{
		if (ex is ApiException apiEx) {
			apiResponse.StatusCode = apiEx.StatusCode;
			apiResponse.Message = apiEx.Message;
			apiResponse.CorrelationId = apiEx.CorrelationId ?? _logger.CorrelationId;

		} else {
			apiResponse.StatusCode = 500;
			apiResponse.Message = ex.Message;
		}

		_logger.Error(ex, ex.Message);

		return new ObjectResult(apiResponse) { StatusCode = apiResponse.StatusCode };
	}

	protected ObjectResult LogErrorAndReturnErrorResponse(ApiResponse apiResponse, Exception ex)
	{
		if (ex is ApiException apiEx) {
			apiResponse.StatusCode = apiEx.StatusCode;
			apiResponse.Message = apiEx.Message;
			apiResponse.CorrelationId = apiEx.CorrelationId ?? _logger.CorrelationId;

		} else {
			apiResponse.StatusCode = 500;
			apiResponse.Message = ex.Message;
		}

		_logger.Error(ex, ex.Message);

		return new ObjectResult(apiResponse) { StatusCode = apiResponse.StatusCode };
	}

	//protected ObjectResult LogErrorAndReturnErrorResponse(ApiResponse apiResponse, Exception ex)
	//{
	//	if (ex is ApiException apiEx) {
	//		apiResponse.StatusCode = apiEx.StatusCode;
	//		apiResponse.Message = apiEx.Message;
	//		apiResponse.CorrelationId = apiEx.CorrelationId ?? _logger.CorrelationId;

	//	} else {
	//		apiResponse.StatusCode = 500;
	//		apiResponse.Message = ex.Message;
	//	}

	//	_logger.Error(ex, ex.Message);

	//	return new ObjectResult(apiResponse) { StatusCode = apiResponse.StatusCode };
	//}
}
