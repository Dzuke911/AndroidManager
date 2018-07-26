using AndroidManager.Shell.Web.Attribute;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AndroidManager.Shell.Web.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "This field is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [Remote("EmailExists", "Account", HttpMethod = "POST", ErrorMessage = "This email address already registered.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [PasswordValidate]
        public string Password { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [Compare("Password", ErrorMessage = "Password does not match the confirm password")]
        [PasswordValidate]
        public string ConfirmPassword { get; set; }
    }
}
