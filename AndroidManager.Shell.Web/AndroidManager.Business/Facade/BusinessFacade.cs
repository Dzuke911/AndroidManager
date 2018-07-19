using AndroidManager.Business.Authentication;
using AndroidManager.Data.Facade;
using AndroidManager.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AndroidManager.Business
{
    public static class BusinessFacade
    {
        public static IConfiguration Configuration { get; set; }

        public static void ConfigureServices(IServiceCollection services)
        {
            DataFacade.Configuration = Configuration;
            DataFacade.ConfigureServices(services);
            DataFacade.InitDatabase();

            services.AddTransient<IAuthenticationManager, AuthenticationManager>(s => new AuthenticationManager(s.GetService<UserManager<ApplicationUser>>(), s.GetService<SignInManager<ApplicationUser>>()));
        }
    }
}
