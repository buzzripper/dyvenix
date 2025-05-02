
namespace Dyvenix.Core.Queries;

public interface ISortingQuery
{
	string SortBy { get; set; }
	bool SortDesc { get; set; }
}
