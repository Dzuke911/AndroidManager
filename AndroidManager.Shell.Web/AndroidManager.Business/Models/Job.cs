using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace AndroidManager.Business.Models
{
    public class Job
    {
        public readonly string Name;
        public readonly string Description;
        public readonly int Complexity;

        public readonly bool IsValid = true;

        public Job(string name, string description, int complexity)
        {
            Name = name;
            Description = description;
            Complexity = complexity;

            if (name.Length < 2 || name.Length > 16)
            {
                IsValid = false;
            }
            else if(!Regex.IsMatch(name, "^[a-zA-Z0-9-]+$"))
            {
                IsValid = false;
            }
            else if (description.Length > 255)
            {
                IsValid = false;
            }
            else if(complexity < 0)
            {
                IsValid = false;
            }
        }

        public JObject ToJson(int Id)
        {
            return new JObject(new JProperty("Id",Id),
                new JProperty("Name", Name),
                new JProperty("Description", Description),
                new JProperty("Complexity", Complexity));
        }
    }
}
