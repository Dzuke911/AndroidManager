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
    class SkillsManager : ISkillsManager
    {
        private readonly ApplicationContext _context;

        public SkillsManager( ApplicationContext context)
        {
            _context = context;
        }

        public async Task<bool> IsSkill(string name)
        {
            if(await _context.Skills.FirstOrDefaultAsync(s => s.Name == name) != null)
            {
                return true;
            }

            return false;
        }

        public async Task<Result> TryCreate(Skill skill)
        {
            if (!skill.IsValid) { return new Result(false, "Skill wasn`t created"); }
            if (await IsSkill(skill.Name)) { return new Result(false, "Skill with this name already exists"); }

            await _context.Skills.AddAsync(new SkillEntity { Name = skill.Name });
            await _context.SaveChangesAsync();

            return new Result(true);
        }

        public async Task<JArray> GetSkills()
        {
            JArray ret = new JArray();

            await _context.Skills.LoadAsync();

            foreach (SkillEntity skill in _context.Skills)
            {
                ret.Add(skill.Name);
            }

            return ret;
        }
    }
}
