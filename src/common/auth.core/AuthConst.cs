using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core;

public static class AuthConst
{
	public static string RoleKey => "dyv_role";
	public static string TokenHeaderName => "Dyv-Access-Token";
	public static string ClaimsIdentityId => "DyvenixClaims";

}
