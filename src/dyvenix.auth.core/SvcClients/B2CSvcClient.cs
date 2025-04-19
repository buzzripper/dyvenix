using Dyvenix.Auth.Core.Config;
using Dyvenix.Core.Exceptions;
using Dyvenix.Logging;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Dyvenix.Auth.Core.SvcClients;

public interface IB2CSvcClient
{
	Task<TokenFromAuthCodeResponse> GetTokenFromAuthCode(string authCode, string codeVerifier);
}

public class B2CSvcClient : IB2CSvcClient
{
	private static JsonSerializerOptions _jsonSerializerOptions;

	static B2CSvcClient()
	{
		_jsonSerializerOptions = new JsonSerializerOptions {
			WriteIndented = true,
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase
		};
	}

	private readonly B2CConfig _config;
	private readonly HttpClient _httpClient;
	private readonly IDyvenixLogger<B2CSvcClient> _logger;

	public B2CSvcClient(B2CConfig config, IHttpClientFactory httpClientFactory, IDyvenixLogger<B2CSvcClient> logger)
	{
		_httpClient = httpClientFactory.CreateClient();
		_config = config;
		_logger = logger;
	}

	public async Task<TokenFromAuthCodeResponse> GetTokenFromAuthCode(string authCode, string codeVerifier)
	{
		var sb = new StringBuilder();

		sb.Append($"{_config.Instance}/{_config.TenantName}.onmicrosoft.com/{_config.SignUpSignInPolicyId}/oauth2/v2.0/token?");
		sb.Append($"client_id={_config.ClientId}&");
		sb.Append($"grant_type=authorization_code&");
		sb.Append($"scope={_config.ScopesString}&");
		sb.Append($"redirect_uri={_config.RedirectUri}&");
		sb.Append($"code={authCode}&");
		sb.Append($"code_verifier={codeVerifier}");

		return await PostAsync<TokenFromAuthCodeResponse>(sb.ToString(), null);
	}

	private async Task<T> PostAsync<T>(string uri, object payload)
	{
		var responseString = await PostAsync(uri, payload);
		return JsonSerializer.Deserialize<T>(responseString);
	}

	private async Task<string> PostAsync(string uri, object payload)
	{
		var json = JsonSerializer.Serialize(payload, _jsonSerializerOptions);
		using var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
		var httpResponse = await _httpClient.PostAsync(uri, stringContent);

		if (!httpResponse.IsSuccessStatusCode)
			throw new HttpException((int)httpResponse.StatusCode, httpResponse.ReasonPhrase);

		return await httpResponse.Content.ReadAsStringAsync();
	}
}
