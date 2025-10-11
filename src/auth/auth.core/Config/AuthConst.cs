using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core.Config;

public static class AuthConst
{
	public const string ApiId = "auth";
	public const string AppName = "Dyvenix Auth";

	public static string RoleKey => "dyv_role";
	public static string TokenHeaderName => "Dyv-Access-Token";
	public static string ClaimsIdentityId => "DyvenixClaims";

}
