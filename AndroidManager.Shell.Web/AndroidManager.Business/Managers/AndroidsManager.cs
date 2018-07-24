using AndroidManager.Business.Enums;
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
    public class AndroidsManager : IAndroidsManager
    {
        private readonly ApplicationContext _context;

        public AndroidsManager(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<bool> IsAndroid(string name)
        {
            if (await _context.Androids.FirstOrDefaultAsync(a => a.Name == name) != null)
            {
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<JObject>> GetAndroids()
        {
            List<JObject> ret = new List<JObject>();
            JArray skills;
            JObject obj;

            await _context.Androids.LoadAsync();

            foreach (AndroidEntity android in _context.Androids)
            {
                await _context.Entry(android).Collection(a => a.SkillsToAndroids).LoadAsync();

                skills = new JArray();

                foreach (SkillToAndroidEntity e in android.SkillsToAndroids)
                {
                    await _context.Entry(e).Reference(s => s.Skill).LoadAsync();
                    skills.Add(new JObject(new JProperty("Id", e.Skill.Id), new JProperty("Name", e.Skill.Name)));
                }

                await _context.Entry(android).Reference(a => a.Job).LoadAsync();

                obj = new JObject(
                    new JProperty("Id", android.Id),
                    new JProperty("Name", android.Name),
                    new JProperty("Job", new JObject(new JProperty("Id", android.Job.Id), new JProperty("Name", android.Job.Name))),
                    new JProperty("Reliability", android.Reliability),
                    new JProperty("Status", android.Status),
                    new JProperty("Skills", skills)
                    );
                ret.Add(obj);
            }

            return ret;
        }

        public async Task<JObject> TryCreate(Android android)
        {
            if (await IsAndroid(android.Name) || !android.IsValid)
            {
                return null;
            }

            AndroidEntity androidEntity = new AndroidEntity { Name = android.Name, Reliability = 10, Status = true };
            JobEntity job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == android.JobId);

            if (job == null)
            {
                return null;
            }

            androidEntity.Job = job;
            await _context.Androids.AddAsync(androidEntity);
            await _context.SaveChangesAsync();

            return android.ToJson(androidEntity.Id);
        }

        public async Task<SkillResult> TryAddSkill(string androidName, string skillName)
        {
            AndroidEntity android = await _context.Androids.FirstOrDefaultAsync(a => a.Name == androidName);

            if (android == null)
            {
                return SkillResult.AndroidNotExists;
            }

            SkillEntity skill = await _context.Skills.FirstOrDefaultAsync(s => s.Name == skillName);

            if (skill == null)
            {
                return SkillResult.SkillNotExists;
            }

            await _context.Entry(android).Collection(a => a.SkillsToAndroids).LoadAsync();

            foreach (SkillToAndroidEntity r in android.SkillsToAndroids)
            {
                if (r.Skill.Name == skillName)
                {
                    return SkillResult.AlreadyHadSkill;
                }
            }

            android.SkillsToAndroids.Add(new SkillToAndroidEntity { Skill = skill });
            _context.Update(android);
            await _context.SaveChangesAsync();

            return SkillResult.Success;
        }

        public async Task<AssignResult> TryAssignJob(string androidName, string jobName)
        {
            JobEntity job = await _context.Jobs.FirstOrDefaultAsync(j => j.Name == jobName);

            if (job == null)
            {
                return AssignResult.JobNotExists;
            }

            AndroidEntity android = await _context.Androids.FirstOrDefaultAsync(a => a.Name == jobName);

            if (android == null)
            {
                return AssignResult.AndroidNotExists;
            }

            if (android.Job == job)
            {
                return AssignResult.AlreadyThisJob;
            }

            android.Reliability = Math.Max(--android.Reliability, 0);

            if (android.Reliability <= 0)
            {
                android.Status = false;
            }

            if (!android.Status)
            {
                return AssignResult.AndroidReclaimed;
            }

            android.Job = job;
            _context.Androids.Update(android);
            await _context.SaveChangesAsync();

            return AssignResult.Success;
        }

        public async Task<bool> TryDelete(int id)
        {
            AndroidEntity android = await _context.Androids.FirstOrDefaultAsync(a => a.Id == id);

            if (android == null)
            {
                return false;
            }

            _context.Androids.Remove(android);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<JObject> TryUpdate(int id, Android android)
        {
            if (!android.IsValid)
            {
                return null;
            }

            AndroidEntity androidEntity = await _context.Androids.SingleOrDefaultAsync(a => a.Id == id);

            if (androidEntity == null)
            {
                return null;
            }

            if (androidEntity.Reliability > 0)
            {
                JobEntity job = await _context.Jobs.SingleOrDefaultAsync(j => j.Id == android.JobId);

                if (job == null)
                {
                    return null;
                }

                if (job != androidEntity.Job)
                {
                    androidEntity.Reliability--;

                    if (androidEntity.Reliability <= 0)
                    {
                        androidEntity.Status = false;
                    }

                    androidEntity.Job = job;
                }
            }

            androidEntity.Name = android.Name;

            _context.Update(androidEntity);
            await _context.SaveChangesAsync();

            return android.ToJson(androidEntity.Id);
        }
    }
}
