//------------------------------------------------------------------------------------------------------------
// This file was auto-generated 3/30/2025 8:26 AM. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------

namespace Dyvenix.Server.Common.Queries;

public class GetByCompanyIdwPgingQuery
{

	public int PageSize { get; set; }
	public int PageOffset { get; set; }
	public bool RecalcRowCount { get; set; }
	public bool GetRowCountOnly { get; set; }

	public string CompanyId { get; set; }

}
