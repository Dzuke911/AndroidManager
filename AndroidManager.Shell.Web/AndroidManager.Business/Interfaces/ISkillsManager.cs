using AndroidManager.Business.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Interfaces
{
    public interface ISkillsManager
    {
        Task<bool> TryCreate(Skill skill);
        Task<JArray> GetSkills();
    }
}
