﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Interfaces
{
    public interface ISkillsManager
    {
        Task<bool> TryCreate(string name);
    }
}