//using DotNetEnv;
//using Dyvenix.Server.Server;
//using Dyvenix.Server.Server.Auth;
//using Dyvenix.Server.Server.Config;
//using Buzzripper.Logging;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Identity.Web;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi.Models;
//using Serilog;
//using Serilog.Events;
//using Serilog.Templates;
//using System;
//using System.Collections.Generic;
//using System.Diagnostics;
//using System.Net.Http;
//using System.Reflection;


//Log.Logger = Initializer.CreateLoggerConfiguration().CreateLogger();

//Log.Debug("Getting started");

//Log.Information("Hello {Name} from thread {ThreadId}", Environment.GetEnvironmentVariable("USERNAME"), Environment.CurrentManagedThreadId);

//Log.Warning("No coins remain at position {@Position}", new { Lat = 25, Long = 134 });

//Log.CloseAndFlush();