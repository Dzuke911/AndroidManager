using AndroidManager.Business.Enums;
using AndroidManager.Business.Interfaces;
using AndroidManager.Data.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> TryCreate(string name)
        {
            if (await IsAndroid(name))
            {
                return false;
            }

            await _context.Androids.AddAsync(new AndroidEntity { Name = name, Reliability = 10, Status = true });
            await _context.SaveChangesAsync();

            return true;
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

            foreach(SkillToAndroidEntity r in android.SkillsToAndroids)
            {
                if(r.Skill.Name == skillName)
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

            if(android == null)
            {
                return AssignResult.AndroidNotExists;
            }

            if(android.Job == job)
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
    }
}
