using Dyvenix.App1.Data.Config;
using Dyvenix.App1.Server.Config;
using Dyvenix.Auth.Config;
using Dyvenix.Logging.Config;
using Dyvenix.Logging.Correlation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
	.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
//.AddJsonFile($"appsettings.{appEnv}.json", optional: true);

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

var appConfig = AppConfigBuilder.Build(builder.Configuration);
var authConfig = AuthConfigBuilder.Build(builder.Configuration);
var dataConfig = DataConfigBuilder.Build(builder.Configuration);

Log.Logger = new LogConfigBuilder().Build(builder.Configuration).CreateLogger();
builder.Services.AddDyvenixLoggingServices(builder.Configuration);

builder.Services.AddAppServices(appConfig);
builder.Services.AddDyvenixAuthServices(builder.Configuration, appConfig.UIRootUrl, Log.Logger);
builder.Services.AddDyvenixDataServices(dataConfig);

builder.Services.AddControllers()
	.AddJsonOptions(options => {
		options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
	});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerServices(authConfig.Enabled);
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
app.UseDyvenixAuth(authConfig);

//bool isAzure = Environment.GetEnvironmentVariable("WEBSITE_INSTANCE_ID") != null;
//if (isAzure) {
//	Log.Logger.Debug($"Checking/running database migration(s)...");
//	try {
//		using (var scope = app.Services.CreateScope()) {
//			var db = scope.ServiceProvider.GetRequiredService<DbContextFactory>().CreateDbContext();
//			db.Database.Migrate();
//		}
//	} catch (Exception ex) {
//		Log.Logger.Error(ex, $"Error running database migration(s): {ex.Message}");
//		throw;
//	}
//}

Log.Logger.Debug("Starting application");
app.Run();
Log.Logger.Debug("Application stopped.");

// This is needed by integration tests using WebApplicationFactory
public partial class Program { }