using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TritonBackend.Models;

namespace TritonBackend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            AuthOptions authOptions = Configuration.GetSection("Auth").Get<AuthOptions>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,

                        ValidateLifetime = true,
                        
                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true,
                    };
                });

            services.AddDbContext<TritonDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DBConnection")));

            services.AddControllers().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            }); ;

            services.Configure<AuthOptions>(Configuration.GetSection("Auth"));

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder => 
                {
                    builder.AllowAnyOrigin()//.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            services.AddCoreAdmin();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseCors();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, @"StaticFiles")),
                RequestPath = "/StaticFiles"
            });

            //app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseCoreAdminCustomUrl("admin");
        }
    }
}
