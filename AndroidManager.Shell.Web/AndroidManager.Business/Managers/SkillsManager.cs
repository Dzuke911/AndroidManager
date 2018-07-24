using AndroidManager.Business.Interfaces;
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

        public async Task<bool> TryCreate(string name)
        {
            if(await IsSkill(name))
            {
                return false;
            }

            await _context.Skills.AddAsync(new SkillEntity { Name = name });
            await _context.SaveChangesAsync();

            return true;
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
