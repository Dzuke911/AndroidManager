using AndroidManager.Business.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Interfaces
{
    public interface IJobsManager
    {
        Task<IEnumerable<JObject>> GetJobs();
        Task<Result> TryCreate(Job job);
        Task<Result> TryUpdate(int id, Job job);
        Task<Result> TryDelete(int id);
    }
}
