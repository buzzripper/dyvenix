using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Serilog;
using System;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((ctx, lc) =>
{
    lc.ReadFrom.Configuration(ctx.Configuration)
      .WriteTo.Console()
      .WriteTo.File("logs/bff-.log", rollingInterval: RollingInterval.Day);
});

builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Configure cookie authentication to work with Angular
builder.Services.Configure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.SameSite = SameSiteMode.None; // Required for cross-origin
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Required with SameSite=None  
    options.Cookie.HttpOnly = true;
    options.Cookie.Name = ".AspNetCore.BFF.Auth";
    options.Cookie.Domain = "localhost"; // Critical: Allow cookie to work across ports
    options.Cookie.Path = "/";
    
    // Don't redirect API endpoints - return 401 instead
    options.Events.OnRedirectToLogin = context =>
    {
        var path = context.Request.Path.Value ?? "";
        Console.WriteLine($"??  OnRedirectToLogin triggered for path: {path}");
        
        // If this is an API call (any /auth/* endpoint), return 401 instead of redirecting
        if (path.Contains("/auth/user", StringComparison.OrdinalIgnoreCase))
        {
            Console.WriteLine($"   ? Returning 401 for API endpoint");
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            // Important: Prevent any further processing
            context.Response.Headers["Content-Length"] = "0";
            return Task.CompletedTask;
        }
        
        Console.WriteLine($"   ? Allowing default redirect to: {context.RedirectUri}");
        // For browser navigations, allow the redirect
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});

// Configure OIDC - Azure will redirect to BFF, then BFF redirects to Angular
builder.Services.Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    // Use query response mode instead of form_post to avoid POST to Angular
    options.ResponseMode = "query";
    
    // Reduce state/nonce size to avoid 431 errors
    options.ProtocolValidator.RequireNonce = true;
    options.ProtocolValidator.NonceLifetime = TimeSpan.FromMinutes(15);
    
    options.Events.OnAuthenticationFailed = context =>
    {
        Console.WriteLine($"? OIDC: Authentication failed!");
        Console.WriteLine($"   Error: {context.Exception?.Message}");
        return Task.CompletedTask;
    };

    options.Events.OnTokenValidated = context =>
    {
        Console.WriteLine($"? OIDC: Token validated for user: {context.Principal?.Identity?.Name}");
        return Task.CompletedTask;
    };
    
    options.Events.OnTicketReceived = context =>
    {
        Console.WriteLine($"? OIDC: Ticket received!");
        Console.WriteLine($"   User authenticated: {context.Principal?.Identity?.IsAuthenticated}");
        Console.WriteLine($"   Original redirect URI: {context.Properties.RedirectUri}");
        
        // After authentication completes, redirect to Angular's dashboard
        // NOT to /signin-oidc (that's only for Azure to BFF communication)
        context.HandleResponse();
        
        // Get the return URL from auth properties or default to dashboard
        var returnUrl = context.Properties.Items.TryGetValue("returnUrl", out var url) 
            ? url 
            : "/dashboards/project";
        
        // Redirect to Angular at the return URL
        var redirectUrl = $"https://localhost:4200{returnUrl}";
        context.Response.Redirect(redirectUrl);
        
        Console.WriteLine($"   Redirecting to Angular: {redirectUrl}");
        
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToIdentityProvider = context =>
    {
        Console.WriteLine($"?? OIDC: Redirecting to identity provider...");
        Console.WriteLine($"   Authority: {context.ProtocolMessage?.IssuerAddress}");
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToIdentityProviderForSignOut = context =>
    {
        Console.WriteLine($"?? OIDC: Redirecting to sign out");
        if (context.ProtocolMessage != null)
        {
            context.ProtocolMessage.PostLogoutRedirectUri = "https://localhost:4200";
        }
        return Task.CompletedTask;
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Critical for cookies
    });
});

var app = builder.Build();

app.UseSerilogRequestLogging();

// CORS must come before authentication
app.UseCors();

// Serve static files from Angular build output
var angularPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "ui", "Angular", "dist", "fuse", "browser");
if (Directory.Exists(angularPath))
{
    Console.WriteLine($"? Serving Angular static files from: {angularPath}");
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(angularPath),
        RequestPath = ""
    });
}
else
{
    Console.WriteLine($"??  Angular build directory not found: {angularPath}");
    Console.WriteLine($"   Run 'npm run build' in src/ui/Angular");
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Fallback to Angular's index.html for client-side routing
app.MapFallbackToFile("index.html", new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(angularPath)
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
