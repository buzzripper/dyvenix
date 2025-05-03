//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 4/2/2025 9:33 PM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Buzzripper.Core.Queries;

namespace Dyvenix.Server.Common.Queries;

public class QueryByCompanySortedQuery : ISortingQuery
{
	public string SortBy { get; set; }
	public bool SortDesc { get; set; }


	public string ExtId { get; set; }
	public string CompanyId { get; set; }

}
