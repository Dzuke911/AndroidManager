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

namespace AndroidManager.Shell.Web.Controllers
{
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
            bool result = await _jobsManager.TryCreate((string)job.Property("Name"), (string)job.Property("Description"), (int)job.Property("Complexity"));
            if (result)
            {
                return Ok(job);
            }

            return BadRequest(job);
        }
    }
}