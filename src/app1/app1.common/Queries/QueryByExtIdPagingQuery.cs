//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 4/1/2025 10:11 PM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;


namespace Dyvenix.App1.Server.Services.Queries;

public class QueryByExtIdPagingQuery 
{

	public int PageSize { get; set; }
	public int PageOffset { get; set; }
	public bool RecalcRowCount { get; set; }
	public bool GetRowCountOnly { get; set; }

	public string ExtId { get; set; }

}
