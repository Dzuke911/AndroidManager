using AndroidManager.Business.Enums;
using AndroidManager.Business.Models;
using AndroidManager.Data.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Interfaces
{
    public interface IAndroidsManager
    {
        Task<IEnumerable<JObject>> GetAndroids();

        Task<JObject> TryCreate(Android android);
        Task<SkillResult> TryAddSkill(string androidName, string skillName);
        Task<bool> TryDelete(int id);
        Task<AssignResult> TryAssignJob(string androidName, string jobName);
        Task<JObject> TryUpdate(int id, Android job);
    }
}
