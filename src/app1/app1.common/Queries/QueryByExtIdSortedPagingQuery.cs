//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 4/2/2025 7:05 AM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;


namespace Dyvenix.App1.Server.Services.Queries;

public class QueryByExtIdSortedPagingQuery 
{

	public int PageSize { get; set; }
	public int PageOffset { get; set; }
	public bool RecalcRowCount { get; set; }
	public bool GetRowCountOnly { get; set; }

	public string ExtId { get; set; }

}
