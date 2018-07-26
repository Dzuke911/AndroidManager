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

        public async Task<Result> TryDelete(int id)
        {
            JobEntity jobEntity = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);

            if (jobEntity == null) { return new Result(false, "There is no job with current id"); }

            await _context.Entry(jobEntity).Collection(j => j.Androids).LoadAsync();

            if (jobEntity.Androids.Count > 0) { return new Result(false, "Can`t delete job with androids assigned"); }

            _context.Jobs.Remove(jobEntity);
            await _context.SaveChangesAsync();

            return new Result(true);
        }

        public async Task<Result> TryCreate(Job job)
        {
            if (!job.IsValid) { return new Result(false, "Job wasn`t created"); }
            if (await IsJob(job.Name)) { return new Result(false, "Job with this name already exists"); }

            JobEntity jobEntity = new JobEntity { Name = job.Name, Description = job.Description, Complexity = job.Complexity };

            await _context.Jobs.AddAsync(jobEntity);
            await _context.SaveChangesAsync();

            return new Result(true);
        }

        public async Task<Result> TryUpdate(int id, Job job)
        {
            if(!job.IsValid) { return new Result(false, "Job wasn`t updated"); }

            JobEntity jobEntity = await _context.Jobs.SingleOrDefaultAsync(j => j.Id == id);

            if(jobEntity == null) { return new Result(false, "There is no job with current id"); }

            jobEntity.Name = job.Name;
            jobEntity.Description = job.Description;
            jobEntity.Complexity = job.Complexity;

            _context.Update(jobEntity);
            await _context.SaveChangesAsync();

            return new Result(true);
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
