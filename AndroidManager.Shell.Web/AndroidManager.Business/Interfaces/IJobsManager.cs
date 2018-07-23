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
        Task<JObject> TryCreate(Job job);
        Task<IEnumerable<JObject>> GetJobs();
        Task<JObject> TryUpdate(int id, Job job);
    }
}
