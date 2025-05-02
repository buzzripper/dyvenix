using Dyvenix.Core.Queries;

namespace Dyvenix.App1.Common.Queries;

public class GetAppUsersQuery : IPagingQuery, ISortingQuery
{
	public int RowOffset { get; set; }
	public int PageSize { get; set; }
	public bool RecalcRowCount { get; set; }
	public bool GetRowCountOnly { get; set; }
	public string SortBy { get; set; }
	public bool SortDesc { get; set; }

	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string Email { get; set; }
	public bool? IsEnabled { get; set; }
}
