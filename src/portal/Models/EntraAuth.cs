using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Dyvenix.Portal.Models
{
    //public class TokenIssuanceRequest
    //{
    //    public string Type { get; set; }
    //    public TokenIssuanceData Data { get; set; }
    //}

    //public class TokenIssuanceData
    //{
    //    [JsonPropertyName("@odata.type")]
    //    public string ODataType { get; set; }

    //    public string TenantId { get; set; }
    //    public string AuthenticationEventListenerId { get; set; }
    //    public string CustomAuthenticationExtensionId { get; set; }
    //    public UserInfo User { get; set; }
    //    public AuthenticationContext AuthenticationContext { get; set; }
    //}

    //public class UserInfo
    //{
    //    public string Id { get; set; }
    //    public string UserPrincipalName { get; set; }
    //    public string Email { get; set; }
    //    public string DisplayName { get; set; }
    //    public string GivenName { get; set; }
    //    public string Surname { get; set; }
    //}

    //public class AuthenticationContext
    //{
    //    public string CorrelationId { get; set; }
    //    public ClientInfo Client { get; set; }
    //    public string Protocol { get; set; }
    //    public ServicePrincipalInfo ClientServicePrincipal { get; set; }
    //}

    //public class ClientInfo
    //{
    //    public string Ip { get; set; }
    //    public string Locale { get; set; }
    //    public string Market { get; set; }
    //}

    //public class ServicePrincipalInfo
    //{
    //    public string Id { get; set; }
    //    public string AppId { get; set; }
    //    public string DisplayName { get; set; }
    //}

    //// Response model
    //public class TokenIssuanceResponse
    //{
    //    public ResponseData Data { get; set; }
    //}

    //public class ResponseData
    //{
    //    public ClaimsAction[] Actions { get; set; }
    //}

    //public class ClaimsAction
    //{
    //    [JsonPropertyName("@odata.type")]
    //    public string ODataType => "microsoft.graph.tokenIssuanceStart.provideClaimsForToken";

    //    public Dictionary<string, object> Claims { get; set; }
    //}

    //---------------------------------------------

    public sealed class TokenIssuanceStartResponse
    {
        [JsonPropertyName("data")]
        public TokenIssuanceStartResponseData Data { get; set; } = new();
    }

    public sealed class TokenIssuanceStartResponseData
    {
        [JsonPropertyName("@odata.type")]
        public string ODataType { get; set; } = "microsoft.graph.onTokenIssuanceStartResponseData";

        [JsonPropertyName("actions")]
        public List<ProvideClaimsForTokenAction> Actions { get; set; } = new();
    }

    public sealed class ProvideClaimsForTokenAction
    {
        [JsonPropertyName("@odata.type")]
        public string ODataType { get; set; } = "microsoft.graph.tokenIssuanceStart.provideClaimsForToken";

        // Values can be string or array; using object for flexibility
        [JsonPropertyName("claims")]
        public Dictionary<string, object> Claims { get; set; } = new();
    }


    public class TokenIssuanceStartRequest
    {
        [JsonPropertyName("data")]
        public TokenIssuanceStartRequestData Data { get; set; } = new TokenIssuanceStartRequestData();
    }

    public class TokenIssuanceStartRequestData
    {
        [JsonPropertyName("@odata.type")]
        public string ODataType { get; set; } = default!;

        [JsonPropertyName("authenticationContext")]
        public AuthenticationContext? AuthenticationContext { get; set; }

        [JsonPropertyName("user")]
        public JsonElement? User { get; set; }

        [JsonPropertyName("application")]
        public JsonElement? Application { get; set; }

        [JsonPropertyName("session")]
        public JsonElement? Session { get; set; }

        [JsonPropertyName("tenantId")]
        public string? TenantId { get; set; }

        [JsonPropertyName("context")]
        public JsonElement? Context { get; set; }

        [JsonPropertyName("additionalData")]
        public JsonElement? AdditionalData { get; set; }
    }

    public class AuthenticationContext
    {
        [JsonPropertyName("correlationId")]
        public string? CorrelationId { get; set; }
        [JsonPropertyName("authenticationEventId")]
        public string? AuthenticationEventId { get; set; }
        [JsonPropertyName("redirectUri")]
        public string? RedirectUri { get; set; }
        // … any other fields
    }


}
