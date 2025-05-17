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

		if (!_cache.TryGetValue(cacheKey, out AccessClaimsToken claimsToken)) {
			var claims = GetAccessClaims(userId);

			claimsToken = new AccessClaimsToken {
				CallerType = 1,
				CallerId = userId,
				AccessClaims = claims
			};

			_cache.Set(cacheKey, claimsToken, new MemoryCacheEntryOptions {
				SlidingExpiration = TimeSpan.FromMinutes(30)
			});
		}

		string json = JsonSerializer.Serialize(claimsToken);
		return Task.FromResult(json);
	}

	private List<AccessClaim> GetAccessClaims(string userId)
	{
		// TODO: Replace this with actual DB logic
		return new List<AccessClaim>
		{
			new AccessClaim { Name = "plan", Value = "pro" },
			new AccessClaim { Name = "region", Value = "us-east" }
		};
	}
}
