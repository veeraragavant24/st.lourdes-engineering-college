using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using STLourdes.Api.Data;
using STLourdes.Api.Models;
using STLourdes.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// --------------------------------------------------
// 1. SQL SERVER DATABASE
// --------------------------------------------------

var connectionString = builder.Configuration
    .GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "SQL Server connection string is missing.");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// --------------------------------------------------
// 2. PASSWORD HASHING
// --------------------------------------------------

builder.Services.AddScoped<
    IPasswordHasher<AdminUser>,
    PasswordHasher<AdminUser>>();

// --------------------------------------------------
// 3. JWT AUTHENTICATION
// --------------------------------------------------

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrWhiteSpace(jwtKey) ||
    Encoding.UTF8.GetByteCount(jwtKey) < 32)
{
    throw new InvalidOperationException(
        "JWT signing key must be configured and at least 32 bytes long.");
}

if (string.IsNullOrWhiteSpace(jwtIssuer) ||
    string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException(
        "JWT Issuer and Audience must be configured.");
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtIssuer,

                ValidateAudience = true,
                ValidAudience = jwtAudience,

                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey)),

                ClockSkew = TimeSpan.FromMinutes(1)
            };
    });

builder.Services.AddAuthorization();

// --------------------------------------------------
// 4. CORS - REACT FRONTEND
// --------------------------------------------------

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173",
                "http://localhost:4173",
                "https://localhost:4173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// --------------------------------------------------
// 5. EMAIL SERVICE
// --------------------------------------------------

builder.Services.AddScoped<EmailService>();

// --------------------------------------------------
// 6. CONTROLLERS AND SWAGGER
// --------------------------------------------------

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --------------------------------------------------
// 7. BUILD APPLICATION
// --------------------------------------------------

var app = builder.Build();

// --------------------------------------------------
// 8. SEED INITIAL ADMIN ACCOUNT
// --------------------------------------------------

await AdminSeeder.SeedAsync(
    app.Services,
    app.Configuration);

// --------------------------------------------------
// 9. HTTP REQUEST PIPELINE
// --------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();