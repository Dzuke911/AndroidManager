using AndroidManager.Business.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Interfaces
{
    public interface IAndroidsManager
    {
        Task<bool> TryCreate(string name);
        Task<SkillResult> TryAddSkill(string androidName, string skillName);
        Task<AssignResult> TryAssignJob(string androidName, string jobName);
    }
}
