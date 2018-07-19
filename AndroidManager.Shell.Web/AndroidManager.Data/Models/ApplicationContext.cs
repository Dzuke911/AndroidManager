using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AndroidManager.Data.Models
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<JobEntity> Jobs { get; set; }
        public DbSet<AndroidEntity> Androids { get; set; }
        public DbSet<SkillEntity> Skills { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SkillToAndroidEntity>().HasKey(e => new { e.AndroidId, e.SkillId });
        }
    }
}
