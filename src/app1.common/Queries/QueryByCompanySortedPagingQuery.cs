//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 4/2/2025 9:33 PM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;


namespace Dyvenix.App1.Server.Services.Queries;

public class QueryByCompanySortedPagingQuery 
{

	public int PageSize { get; set; }
	public int PageOffset { get; set; }
	public bool RecalcRowCount { get; set; }
	public bool GetRowCountOnly { get; set; }

	public string ExtId { get; set; }
	public string CompanyId { get; set; }

}
