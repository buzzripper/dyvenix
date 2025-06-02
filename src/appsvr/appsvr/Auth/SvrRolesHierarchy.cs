using System.Collections.Generic;
using System;
using Dyvenix.AppSvr.Api.Auth;

namespace Dyvenix.Auth.Core;

public static class SvrRolesHierarchy
{
	static SvrRolesHierarchy()
	{
		// User
		Roles.Add(SvrRoles.User, new HashSet<string>(StringComparer.OrdinalIgnoreCase) { SvrRoles.User });

		// Sys_Read
		Roles.Add(SvrRoles.Sys_Read, new HashSet<string>(StringComparer.OrdinalIgnoreCase) { SvrRoles.Sys_Read });

		// Sys_Write
		Roles.Add(SvrRoles.Sys_Write, new HashSet<string>(StringComparer.OrdinalIgnoreCase) { SvrRoles.Sys_Write });
		Roles[SvrRoles.Sys_Write].Add(SvrRoles.Sys_Read);	// Sys_Write implies Sys_Read

		// Sys_Admin
		Roles.Add(SvrRoles.Sys_Admin, new HashSet<string>(StringComparer.OrdinalIgnoreCase) { SvrRoles.Sys_Admin });
		Roles[SvrRoles.Sys_Admin].Add(SvrRoles.Sys_Read);	// Sys_Admin implies Sys_Read
		Roles[SvrRoles.Sys_Admin].Add(SvrRoles.Sys_Write);	// Sys_Admin implies Sys_Write
	}

	public static readonly Dictionary<string, HashSet<string>> Roles = new(StringComparer.OrdinalIgnoreCase);
}
