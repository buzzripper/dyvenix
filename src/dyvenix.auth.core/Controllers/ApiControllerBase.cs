using Dyvenix.Core.DTOs;
using Dyvenix.Core.Exceptions;
using Dyvenix.Logging;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Dyvenix.Auth.Core.Controllers;

public class ApiControllerBase<T> : ControllerBase where T : ApiControllerBase<T>
{
	protected readonly IDyvenixLogger<T> _logger;

	public ApiControllerBase(IDyvenixLogger<T> logger)
	{
		_logger = logger;
	}

	protected ObjectResult LogErrorAndReturnErrorResponse(Exception ex)
	{
		var errResponse = new ApiResponse();

		if (ex is ApiException apiEx) {
			errResponse.StatusCode = apiEx.StatusCode;

			if (string.IsNullOrEmpty(apiEx.CorrelationId))
				errResponse.Message = apiEx.Message;
			else
				errResponse.Message = $"{apiEx.Message} [CorrelationId: {apiEx.CorrelationId}]";

		} else {
			errResponse.StatusCode = 500;
			errResponse.Message = ex.Message;
		}

		_logger.Error(ex, ex.Message);

		return new ObjectResult(errResponse) { StatusCode = errResponse.StatusCode };
	}
}
