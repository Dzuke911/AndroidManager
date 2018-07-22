using AndroidManager.Business.Interfaces;
using AndroidManager.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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

        public async Task<bool> TryCreate(string name, string description, int complexity)
        {
            if (await IsJob(name))
            {
                return false;
            }

            await _context.Jobs.AddAsync(new JobEntity { Name = name , Description = description, Complexity = complexity});
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<JObject>> GetJobs()
        {
            List<JObject> ret = new List<JObject>();
            JArray androids;
            JObject obj;

            await _context.Jobs.LoadAsync();

            foreach (JobEntity job in _context.Jobs)
            {
                await _context.Entry(job).Collection(j => j.Androids).LoadAsync();
                androids = new JArray();

                foreach (AndroidEntity a in job.Androids)
                {
                    androids.Add(a.Name);
                }

                obj = new JObject(
                    new JProperty("Id", job.Id),
                    new JProperty("Name", job.Name),
                    new JProperty("Description", job.Description),
                    new JProperty("Complexity", job.Complexity),
                    new JProperty("Androids", androids)
                    );
                ret.Add(obj);
            }

            return ret;
        }
    }
}
