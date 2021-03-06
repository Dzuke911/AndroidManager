﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace AndroidManager.Business.Models
{
    public class Skill
    {
        public readonly string Name;

        public readonly bool IsValid = true;

        public Skill(string name)
        {
            Name = name;

            if (name.Length < 5 || name.Length > 16)
            {
                IsValid = false;
            }
            else if(!Regex.IsMatch(name, "^[a-zA-Z0-9-]+$"))
            {
                IsValid = false;
            }
        }

        public JObject ToJson(int Id)
        {
            return new JObject(new JProperty("Id", Id),
                new JProperty("Name", Name));
        }
    }
}
