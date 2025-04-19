//------------------------------------------------------------------------------
// This is auto-generated code. Any changes made to this file will be lost.
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace Dyvenix.App1.Data.Entities
{
    public partial class AccessClaim
    {

        public int Id { get; set; }

        public string ClaimName { get; set; }

        public string ClaimValue { get; set; }

        public System.Guid AppUserId { get; set; }
    
        #region Extensibility Method Definitions

        
        #endregion

        #region Static 

        public static class PropNames 
        {
          public const string Id = "Id";
          public const string ClaimName = "ClaimName";
          public const string ClaimValue = "ClaimValue";
          public const string AppUserId = "AppUserId";
        }

        // Not used by EF itself, this is a helper method that will simply instantiate all collections on the class after creating it
        public static AccessClaim Create() 
        {
          var accessClaim = new AccessClaim();


          return accessClaim;
        }

        #endregion
    }
}
