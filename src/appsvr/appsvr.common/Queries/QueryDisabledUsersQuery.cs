//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 3/28/2025 9:41 PM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Buzzripper.Core.Queries;

namespace Dyvenix.Server.Common.Queries;

public class QueryDisabledUsersQuery : ISortingQuery
{
	public string SortBy { get; set; }
	public bool SortDesc { get; set; }


	public string LastName { get; set; }
	public bool? IsEnabled { get; set; }

}
