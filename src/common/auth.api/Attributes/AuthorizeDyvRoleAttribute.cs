using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Dyvenix.Auth.Core;

namespace Dyvenix.Auth.Api.Attributes;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
public class AuthorizeDyvRoleAttribute : Attribute, IAuthorizationFilter
{
    private readonly HashSet<string> _requiredRoles;

    public AuthorizeDyvRoleAttribute(params string[] roles)
    {
        _requiredRoles = new HashSet<string>(roles, StringComparer.OrdinalIgnoreCase);
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        if (!user.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var userRoles = user.FindAll(AuthConst.RoleKey).Select(c => c.Value);

        if (!_requiredRoles.Overlaps(userRoles))
        {
            context.Result = new ForbidResult();
        }
    }
}
