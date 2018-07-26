using AndroidManager.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Authentication
{
    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticationManager(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateNewUserAsync(string email, string password)
        {
            return await _userManager.CreateAsync(new ApplicationUser { UserName = email, Email = email }, password);
        }

        public async Task<SignInResult> PasswordSignInAsync(string email, string password, bool rememberMe)
        {
            return await _signInManager.PasswordSignInAsync(email, password, rememberMe, false);
        }

        public async Task SignInAsync(string email)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(email);
            await _signInManager.SignInAsync(user, false);
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<bool> EmailAlreadyExistsAsync(string email)
        {
            return (await _userManager.FindByNameAsync(email) != null);
        }
    }
}
