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
            int complexity;
            try
            {
                complexity = job.Value<int>("Complexity");
            }
            catch
            {
                complexity = 0;
            }

            Job newJob = new Job(job.Value<string>("Name"), job.Value<string>("Description"), complexity);
            Result res = await _jobsManager.TryCreate(newJob);

            if (res.Succeeded) { return Ok(res.ToJson()); }

            return BadRequest(res.ToJson());
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]JObject job)
        {
            int complexity;
            try
            {
                complexity = job.Value<int>("Complexity");
            }
            catch
            {
                complexity = 0;
            }

            Job newJob = new Job(job.Value<string>("Name"), job.Value<string>("Description"), complexity);
            Result res = await _jobsManager.TryUpdate((int)job.Property("Id"),newJob);

            if (res.Succeeded) { return Ok(res.ToJson()); }

            return BadRequest(res.ToJson());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]JObject obj)
        {
            Result res = await _jobsManager.TryDelete(obj.Value<int>("Id"));

            if (res.Succeeded) { return Ok(res.ToJson()); }

            return BadRequest(res.ToJson());
        }
    }
}