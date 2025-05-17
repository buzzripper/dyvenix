//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 3/30/2025 9:21 AM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Buzzripper.Core.Queries;

namespace Dyvenix.Server.Common.Queries;

public class GetByExtIdSortedQuery : ISortingQuery
{
	public string SortBy { get; set; }
	public bool SortDesc { get; set; }


	public string ExtId { get; set; }

}
