using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Authentication
{
    public interface IAuthenticationManager
    {
        Task<SignInResult> PasswordSignInAsync(string email, string password, bool rememberMe);
        Task SignInAsync(string email);
        Task<IdentityResult> CreateNewUserAsync(string email, string password);
        Task SignOutAsync();
        Task<bool> EmailAlreadyExistsAsync(string email);
    }
}
