using AndroidManager.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AndroidManager.Data.Facade
{
    public static class DataFacade
    {
        public static IConfiguration Configuration { get; set; }

        public static void InitDatabase(string connectionString = null)
        {
            if (connectionString == null)
            {
                connectionString = Configuration.GetConnectionString("Database");
            }

            DbContextOptionsBuilder<ApplicationContext> contextOptionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            contextOptionsBuilder.UseSqlServer(connectionString);

            using (ApplicationContext context = new ApplicationContext(contextOptionsBuilder.Options))
            {
                context.Database.Migrate();
            }
        }

        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Database")));

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
            })
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddDefaultTokenProviders();
        }
    }
}
