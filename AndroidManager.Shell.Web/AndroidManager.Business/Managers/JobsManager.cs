using AndroidManager.Business.Interfaces;
using AndroidManager.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Managers
{
    public class JobsManager : IJobsManager
    {
        private readonly ApplicationContext _context;

        public JobsManager(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<bool> IsJob(string name)

        {
            if (await _context.Jobs.FirstOrDefaultAsync(j => j.Name == name) != null)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> TryCreate(string name)
        {
            if (await IsJob(name))
            {
                return false;
            }

            await _context.Jobs.AddAsync(new JobEntity { Name = name });
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
