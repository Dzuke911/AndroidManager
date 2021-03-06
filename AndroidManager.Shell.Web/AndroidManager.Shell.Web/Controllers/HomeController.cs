﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AndroidManager.Shell.Web.Models;
using Microsoft.AspNetCore.Authorization;

namespace AndroidManager.Shell.Web.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Jobs()
        {
            return View();
        }

        public IActionResult Androids()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
