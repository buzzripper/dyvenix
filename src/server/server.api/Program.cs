using Buzzripper.Logging.Config;
using Buzzripper.Logging.Correlation;
using Dyvenix.Server.Api.Config;
using Dyvenix.Server.Data.Config;
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
var dataConfig = DataConfigBuilder.Build(builder.Configuration);

Log.Logger = new LogConfigBuilder().Build(builder.Configuration).CreateLogger();
builder.Services.AddDyvenixLoggingServices(builder.Configuration);
Log.Logger.Information($"---------------------------------------");
Log.Logger.Information(appConfig.AppName);
Log.Logger.Information($"---------------------------------------");

builder.Services.AddAppServices(appConfig);
builder.Services.AddDyvenixDataServices(dataConfig);

builder.Services.AddControllers()
	.AddJsonOptions(options => {
		options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
	});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices();
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

//----------------------------------------------------------------------------------------------

Log.Logger.Debug("Building web application");
var app = builder.Build();

app.UseSwaggerServices(builder.Services);
app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();

app.UseMiddleware<CorrelationIdMiddleware>();

Log.Logger.Debug("Starting application");
app.Run();
Log.Logger.Debug("Application stopped.");

// This is needed by integration tests using WebApplicationFactory
public partial class Program { }