using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Dyvenix.Portal.Models
{
    public class TokenIssuanceRequest
    {
        public string Type { get; set; }
        public TokenIssuanceData Data { get; set; }
    }

    public class TokenIssuanceData
    {
        [JsonPropertyName("@odata.type")]
        public string ODataType { get; set; }

        public string TenantId { get; set; }
        public string AuthenticationEventListenerId { get; set; }
        public string CustomAuthenticationExtensionId { get; set; }
        public UserInfo User { get; set; }
        public AuthenticationContext AuthenticationContext { get; set; }
    }

    public class UserInfo
    {
        public string Id { get; set; }
        public string UserPrincipalName { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
    }

    public class AuthenticationContext
    {
        public string CorrelationId { get; set; }
        public ClientInfo Client { get; set; }
        public string Protocol { get; set; }
        public ServicePrincipalInfo ClientServicePrincipal { get; set; }
    }

    public class ClientInfo
    {
        public string Ip { get; set; }
        public string Locale { get; set; }
        public string Market { get; set; }
    }

    public class ServicePrincipalInfo
    {
        public string Id { get; set; }
        public string AppId { get; set; }
        public string DisplayName { get; set; }
    }

    // Response model
    public class TokenIssuanceResponse
    {
        public ResponseData Data { get; set; }
    }

    public class ResponseData
    {
        public ClaimsAction[] Actions { get; set; }
    }

    public class ClaimsAction
    {
        [JsonPropertyName("@odata.type")]
        public string ODataType => "microsoft.graph.tokenIssuanceStart.provideClaimsForToken";

        public Dictionary<string, object> Claims { get; set; }
    }
}
