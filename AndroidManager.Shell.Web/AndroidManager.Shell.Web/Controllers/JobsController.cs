using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AndroidManager.Shell.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using AndroidManager.Business.Interfaces;
using AndroidManager.Business.Models;

namespace AndroidManager.Shell.Web.Controllers
{
    [Authorize]
    public class JobsController : Controller
    {
        private readonly IJobsManager _jobsManager;

        public JobsController(IJobsManager jobsManager)
        {
            _jobsManager = jobsManager;
        }

        [HttpGet]
        public async Task<IEnumerable<JObject>> Get()
        {
            IEnumerable<JObject> ret = await _jobsManager.GetJobs();
            return ret;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]JObject job)
        {
            Job newJob = new Job((string)job.Property("Name"), (string)job.Property("Description"), (int)job.Property("Complexity"));
            JObject result = await _jobsManager.TryCreate(newJob);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]JObject job)
        {
            Job newJob = new Job((string)job.Property("Name"), (string)job.Property("Description"), (int)job.Property("Complexity"));
            JObject result = await _jobsManager.TryUpdate((int)job.Property("Id"),newJob);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]JObject obj)
        {
            int id = (int)obj.Property("Id");

            if (await _jobsManager.TryDelete(id))
            {
                return Ok(true);
            }

            return BadRequest(false);
        }
    }
}