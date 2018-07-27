using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace AndroidManager.Business.Models
{
    public class Android
    {
        public readonly string Name;
        public readonly int JobId;
        public readonly Skill[] Skills;
        public readonly string Avatar;

        public readonly bool IsValid = true;

        public Android(string name, int jobId, string avatar, params Skill[] skills)
        {
            Skills = skills;
            Name = name;
            JobId = jobId;
            Avatar = avatar;

            if (name.Length < 5 || name.Length > 24)
            {
                IsValid = false;
            }
            else if(!Regex.IsMatch(name, "^[a-zA-Z0-9-]+$"))
            {
                IsValid = false;
            }

            for(int i = 0; i< skills.Length; i++)
            {
                for (int j = 0; j < skills.Length; j++)
                {
                    if(i != j)
                    {
                        if(skills[i].Name == skills[j].Name)
                        {
                            IsValid = false;
                        }
                    }
                }
            }
        }

        public JObject ToJson(int Id)
        {
            return new JObject(new JProperty("Id", Id), 
                new JProperty("Name", Name),
                new JProperty("JobId", JobId));
        }
    }
}
