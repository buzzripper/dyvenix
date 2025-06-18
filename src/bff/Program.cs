using Dyvenix.Bff.Config;
using Dyvenix.Common.Api.Config;
using Dyvenix.Logging.Config;
using Dyvenix.Logging.Correlation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
if (builder.Environment.IsDevelopment())
	builder.Configuration.AddUserSecrets<Program>();

var appConfig = AppConfigBuilder.Build(builder.Configuration);
var authConfig = AuthConfigBuilder.Build(builder.Configuration);

Log.Logger = new LogConfigBuilder().Build(builder.Configuration).CreateLogger();
builder.Services.AddDyvenixLoggingServices(builder.Configuration);
Log.Logger.Information($"--------------  {appConfig.AppName}  --------------");

builder.Services.RegisterServices(appConfig);
builder.Services.AddAuthServices(builder.Configuration, appConfig.UIRootUrl, Log.Logger);

builder.Services.AddControllers()
	.AddJsonOptions(options => {
		options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
	});

builder.Services.AddApiAuth(builder, authConfig, Log.Logger);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices(authConfig.Enabled);
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

// Add YARP
builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));


//----------------------------------------------------------------------------------------------

Log.Logger.Debug("Building web application");
var app = builder.Build();

app.UseSwaggerServices(builder.Services);
app.UseHttpsRedirection();
app.UseCors("CORSPolicy");
app.UseDefaultFiles(); // Allows serving index.html as default
app.UseStaticFiles(); // Enables serving files from wwwroot
app.UseRouting();

app.UseMiddleware<CorrelationIdMiddleware>();

//app.UseDyvenixAuth(authConfig);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Use YARP
//app.MapReverseProxy();
app.MapReverseProxy().RequireAuthorization();

Log.Logger.Debug("Starting application");
app.Run();
Log.Logger.Debug("Application stopped.");

// This is needed by integration tests using WebApplicationFactory
public partial class Program { }