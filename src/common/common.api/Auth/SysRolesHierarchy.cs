using System;
using System.Collections.Generic;

namespace Dyvenix.Common.Api.Auth;

public static class SysRolesHierarchy
{
	static SysRolesHierarchy()
	{
		Roles.Add(SysRoles.Sys, new HashSet<string>(StringComparer.OrdinalIgnoreCase) { SysRoles.Sys });
	}

	public static readonly Dictionary<string, HashSet<string>> Roles = new(StringComparer.OrdinalIgnoreCase);
}
