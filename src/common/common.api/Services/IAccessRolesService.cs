using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dyvenix.Common.Api.Services;

public interface IAccessRolesService
{
	Task<List<string>> GetAccessRolesForUser(Guid userId);
}
