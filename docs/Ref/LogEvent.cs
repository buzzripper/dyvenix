//------------------------------------------------------------------------------
// This is auto-generated code. Any changes made to this file will be lost.
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace Dyvenix.App1.Data.Entities
{
    public partial class LogEvent
    {

        public string Id { get; set; }

        public System.DateTime TimeStampUTC { get; set; }

        public int LogLevel { get; set; }

        public string Application { get; set; }

        public string Source { get; set; }

        public string Message { get; set; }

        public string CorrelationId { get; set; }

        public string Exception { get; set; }
    
        #region Extensibility Method Definitions

        
        #endregion

        #region Static 

        public static class PropNames 
        {
          public const string Id = "Id";
          public const string TimeStampUTC = "TimeStampUTC";
          public const string LogLevel = "LogLevel";
          public const string Application = "Application";
          public const string Source = "Source";
          public const string Message = "Message";
          public const string CorrelationId = "CorrelationId";
          public const string Exception = "Exception";
        }

        // Not used by EF itself, this is a helper method that will simply instantiate all collections on the class after creating it
        public static LogEvent Create() 
        {
          var logEvent = new LogEvent();


          return logEvent;
        }

        #endregion
    }
}
