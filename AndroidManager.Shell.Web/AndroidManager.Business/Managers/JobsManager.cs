using AndroidManager.Business.Interfaces;
using AndroidManager.Business.Models;
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

        public async Task<bool> TryDelete(int id)
        {
            JobEntity jobEntity = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);

            if (jobEntity == null)
            {
                return false;
            }

            await _context.Entry(jobEntity).Collection(j => j.Androids).LoadAsync();

            if(jobEntity.Androids.Count > 0)
            {
                return false;
            }

            _context.Jobs.Remove(jobEntity);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<JObject> TryCreate(Job job)
        {

            if (!job.IsValid || await IsJob(job.Name))
            {
                return null;
            }

            JobEntity jobEntity = new JobEntity { Name = job.Name, Description = job.Description, Complexity = job.Complexity };

            await _context.Jobs.AddAsync(jobEntity);
            await _context.SaveChangesAsync();

            return job.ToJson(jobEntity.Id);
        }

        public async Task<JObject> TryUpdate(int id, Job job)
        {
            if(!job.IsValid)
            {
                return null;
            }

            JobEntity jobEntity = await _context.Jobs.SingleOrDefaultAsync(j => j.Id == id);

            if(jobEntity == null)
            {
                return null;
            }

            jobEntity.Name = job.Name;
            jobEntity.Description = job.Description;
            jobEntity.Complexity = job.Complexity;

            _context.Update(jobEntity);
            await _context.SaveChangesAsync();

            return job.ToJson(jobEntity.Id);
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
