using System.Threading.Tasks;
using Dyvenix.Common.Api.Services;

namespace Dyvenix.AppSvr.Api.Services;

public class SystemService : ISystemService
{
	public SystemService()
	{
	}

	#region Create

	public void Healthz()
	{
		return;
	}

	#endregion
}
