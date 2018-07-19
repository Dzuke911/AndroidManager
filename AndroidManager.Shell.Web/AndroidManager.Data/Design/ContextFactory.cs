using AndroidManager.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace AndroidManager.Data.Design
{
    class ContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            DbContextOptionsBuilder<ApplicationContext> contextOptionBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            contextOptionBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=AndroidManagerDb;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new ApplicationContext(contextOptionBuilder.Options);
        }
    }
}
