using Asp.Versioning.ApiExplorer;
using Dyvenix.App1.Data.Config;
using Dyvenix.App1.Server.Config;
using Dyvenix.Auth.Core.Config;
using Dyvenix.Logging.Config;
using Dyvenix.Logging.Correlation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;
using System.Text.Json.Serialization;

//const string cRootConfigSectionName = "ApplicationConfig";

// Load environment variables from .env file and get the current app environment
//Env.Load();
//var appEnv = GetAppEnv();

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
	.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
//.AddJsonFile($"appsettings.{appEnv}.json", optional: true);

var appConfig = AppConfigBuilder.Build(builder.Configuration);

Log.Logger = new LogConfigBuilder().Build(appConfig.LogConfig).CreateLogger();
builder.Services.AddDyvenixLoggingServices(builder.Configuration);

builder.Services.AddAppServices(appConfig);
builder.Services.AddDyvenixAuthServices(appConfig.AuthConfig);
builder.Services.AddDyvenixDataServices(appConfig.DataConfig);

builder.Services.AddControllers()
	.AddJsonOptions(options => {
		options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
	});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices(appConfig.AuthConfig.Enabled);
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

//----------------------------------------------------------------------------------------------

Log.Logger.Debug("Building web application");
var app = builder.Build();

app.UseSwaggerServices(builder.Services);
app.UseHttpsRedirection();
app.UseCors("CORSPolicy");
app.MapControllers();
app.UseDefaultFiles(); // Allows serving index.html as default
app.UseStaticFiles(); // Enables serving files from wwwroot
app.UseRouting();

app.UseMiddleware<CorrelationIdMiddleware>();

Log.Logger.Debug($"Application URLs: {Environment.GetEnvironmentVariable("ASPNETCORE_URLS")}");

Log.Logger.Debug("Starting application");
app.Run();
Log.Logger.Debug("Application stopped.");


// This is needed by integration tests using WebApplicationFactory
public partial class Program { }