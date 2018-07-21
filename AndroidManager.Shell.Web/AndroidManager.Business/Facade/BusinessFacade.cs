using AndroidManager.Business.Authentication;
using AndroidManager.Business.Interfaces;
using AndroidManager.Business.Managers;
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
            services.AddTransient<ISkillsManager, SkillsManager>(s => new SkillsManager(s.GetService<ApplicationContext>()));
            services.AddTransient<IJobsManager, JobsManager>(s => new JobsManager(s.GetService<ApplicationContext>()));
            services.AddTransient<IAndroidsManager, AndroidsManager>(s => new AndroidsManager(s.GetService<ApplicationContext>()));
        }
    }
}
