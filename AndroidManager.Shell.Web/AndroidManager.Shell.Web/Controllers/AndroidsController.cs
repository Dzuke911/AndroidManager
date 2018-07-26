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

            IEnumerable<string> sk = android.Value<JArray>("Skills").Values<string>(); ;

            Skill currSkill;
            List<Skill> skills = new List<Skill>();

            foreach(string name in sk)
            {               
                currSkill = new Skill(name);
                await _skillsManager.TryCreate(currSkill);
                skills.Add(currSkill);
            }

            Android newAndroid = new Android(android.Value<string>("Name"), android.Value<int>("JobId"), skills.ToArray());

            Result res = await _androidsManager.TryCreate(newAndroid);

            if (res.Succeeded) { return Ok(res.ToJson()); }

            return BadRequest(res.ToJson());
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]JObject android)
        {
            IEnumerable<string> sk = android.Value<JArray>("Skills").Values<string>(); ;

            Skill currSkill;
            List<Skill> skills = new List<Skill>();

            foreach (string name in sk)
            {
                currSkill = new Skill(name);
                await _skillsManager.TryCreate(currSkill);
                skills.Add(currSkill);
            }

            Android newAndroid = new Android(android.Value<string>("Name"), android.Value<int>("JobId"), skills.ToArray());
            Result res = await _androidsManager.TryUpdate(android.Value<int>("Id"), newAndroid);

            if (res.Succeeded) { return Ok(res.ToJson()); }

            return BadRequest(res.ToJson());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]JObject obj)
        {
            Result res = await _androidsManager.TryDelete(obj.Value<int>("Id"));
            //Result res = await _androidsManager.TryDelete((int)obj.Property("Id"));

            if (res.Succeeded) { return Ok(res.ToJson()); }

            return BadRequest(res.ToJson());
        }

        [HttpPost]
        public async Task<IActionResult> AddImage([FromBody]JObject obj)
        {
            var file = obj.Property("File");
            var name = obj.Property("Name");

            return Ok(true);
        }
    }
}