//------------------------------------------------------------------------------
// This is auto-generated code. Any changes made to this file will be lost.
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace Dyvenix.App1.Data.Entities
{
    public partial class AppUser
    {

        public System.Guid Id { get; set; }

        public string IdentityId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        #region Navigation Properties

        public virtual IList<AccessClaim> AccessClaims { get; set; }

        #endregion
    
        #region Extensibility Method Definitions

        
        #endregion

        #region Static 

        public static class PropNames 
        {
          public const string Id = "Id";
          public const string IdentityId = "IdentityId";
          public const string FirstName = "FirstName";
          public const string LastName = "LastName";
          public const string Email = "Email";
        }

        // Not used by EF itself, this is a helper method that will simply instantiate all collections on the class after creating it
        public static AppUser Create() 
        {
          var appUser = new AppUser();

          appUser.AccessClaims = new List<AccessClaim>();

          return appUser;
        }

        #endregion
    }
}
