using Dyvenix.Auth.Core.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Dyvenix.Bff.Auth;

public interface IAccessClaimProvider
{
	Task<string> GetAccessClaimsForUserAsync(string userId, CancellationToken cancellationToken = default);
}

public class AccessClaimProvider : IAccessClaimProvider
{
	private readonly IMemoryCache _cache;

	public AccessClaimProvider(IMemoryCache cache)
	{
		_cache = cache;
	}

	public Task<string> GetAccessClaimsForUserAsync(string userId, CancellationToken cancellationToken = default)
	{
		var cacheKey = $"AccessClaims:{userId}";

		if (!_cache.TryGetValue(cacheKey, out DyvAccessToken claimsToken)) {
			var claims = GetAccessRoles(userId);

			claimsToken = new DyvAccessToken {
				CallerType = 1,
				CallerId = userId,
				Roles = claims
			};

			_cache.Set(cacheKey, claimsToken, new MemoryCacheEntryOptions {
				SlidingExpiration = TimeSpan.FromMinutes(30)
			});
		}

		string json = JsonSerializer.Serialize(claimsToken);
		return Task.FromResult(json);
	}

	private List<string> GetAccessRoles(string userId)
	{
		// TODO: Replace this with actual DB logic
		return new List<string> { "user.admin", "inv.read" };
	}
}
