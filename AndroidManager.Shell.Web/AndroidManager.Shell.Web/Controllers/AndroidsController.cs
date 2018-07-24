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
    public class AndroidsController : Controller
    {
        private readonly IAndroidsManager _androidsManager;
        private readonly IJobsManager _jobsManager;
        private readonly ISkillsManager _skillsManager;

        public AndroidsController(IAndroidsManager androidsManager, IJobsManager jobsManager, ISkillsManager skillsManager)
        {
            _androidsManager = androidsManager;
            _jobsManager = jobsManager;
            _skillsManager = skillsManager;
        }

        [HttpGet]
        public async Task<IEnumerable<JObject>> Get()
        {
            return await _androidsManager.GetAndroids();
        }

        [HttpGet]
        public async Task<JArray> Skills()
        {
            return await _skillsManager.GetSkills();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]JObject android)
        {
            Android newAndroid = new Android((string)android.Property("Name"), (int)android.Property("JobId"));
            JObject result = await _androidsManager.TryCreate(newAndroid);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]JObject android)
        {
            Android newAndroid = new Android((string)android.Property("Name"), (int)android.Property("JobId"));
            JObject result = await _androidsManager.TryUpdate((int)android.Property("Id"), newAndroid);

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

            if (await _androidsManager.TryDelete(id))
            {
                return Ok(true);
            }

            return BadRequest(false);
        }
    }
}