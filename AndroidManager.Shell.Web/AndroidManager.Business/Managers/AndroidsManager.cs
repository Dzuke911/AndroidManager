using AndroidManager.Business.Enums;
using AndroidManager.Business.Interfaces;
using AndroidManager.Business.Models;
using AndroidManager.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
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
                    new JProperty("Skills", skills),
                    new JProperty("Avatar", android.Avatar)
                    );
                ret.Add(obj);
            }

            return ret;
        }

        public async Task<Result> TryCreate(Android android)
        {
            if (!android.IsValid) { return new Result(false, "Android wasn`t created"); }
            if (await IsAndroid(android.Name)) { return new Result(false, "Android with this name already exists"); }

            if (android.Skills.Where(s => !s.IsValid).Count() > 0) { return new Result(false, "Android wasn`t created: skill error"); }

            AndroidEntity androidEntity = new AndroidEntity { Name = android.Name, Reliability = 10, Status = true , Avatar = android.Avatar};

            JobEntity job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == android.JobId);

            if (job == null) { return new Result(false, "Android wasn`t created: job error"); }

            androidEntity.Job = job;

            SkillEntity skillEntity;
            List<SkillToAndroidEntity> StoAs = new List<SkillToAndroidEntity>();

            foreach (Skill s in android.Skills)
            {
                skillEntity = await _context.Skills.FirstOrDefaultAsync(e => e.Name == s.Name);
                StoAs.Add( new SkillToAndroidEntity { Skill = skillEntity , Android = androidEntity});               
            }

            await _context.Androids.AddAsync(androidEntity);
            await _context.SaveChangesAsync();

            await _context.Entry(androidEntity).Collection(a => a.SkillsToAndroids).LoadAsync();

            foreach (SkillToAndroidEntity s in StoAs)
            {
                androidEntity.SkillsToAndroids.Add(s);
            }

            _context.Update(androidEntity);
            await _context.SaveChangesAsync();

            return new Result(true);
        }

        public async Task<Result> TryDelete(int id)
        {
            AndroidEntity android = await _context.Androids.FirstOrDefaultAsync(a => a.Id == id);

            if (android == null) { return new Result(false, "Can`t find android with current id"); }

            _context.Androids.Remove(android);
            await _context.SaveChangesAsync();

            return new Result(true);
        }

        public async Task<Result> TryUpdate(int id, Android android)
        {
            if (!android.IsValid) { return new Result(false, "Android wasn`t updated"); }

            AndroidEntity androidEntity = await _context.Androids.SingleOrDefaultAsync(a => a.Id == id);

            if (androidEntity == null) { return new Result(false, "Can`t find android with current id"); }

            if (androidEntity.Reliability > 0)
            {
                JobEntity job = await _context.Jobs.SingleOrDefaultAsync(j => j.Id == android.JobId);

                if (job == null) { return new Result(false, "Android wasn`t updated: job error"); }

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
            androidEntity.Avatar = android.Avatar;

            List<SkillEntity> skillEntities = new List<SkillEntity>();
            SkillEntity currEntity;

            foreach (Skill s in android.Skills)
            {
                if (!s.IsValid) { return new Result(false, "Android wasn`t updated: skill error"); }

                currEntity = await _context.Skills.FirstOrDefaultAsync(e => e.Name == s.Name);

                if(currEntity == null) { return new Result(false, "Android wasn`t updated: skill error"); }

                skillEntities.Add(currEntity);
            }

            await _context.Entry(androidEntity).Collection(a => a.SkillsToAndroids).LoadAsync();

            androidEntity.SkillsToAndroids.Clear();
            foreach(SkillEntity e in skillEntities)
            {
                androidEntity.SkillsToAndroids.Add(new SkillToAndroidEntity { Android = androidEntity, Skill = e });
            }            

            _context.Update(androidEntity);
            await _context.SaveChangesAsync();

            return new Result(true);
        }
    }
}
