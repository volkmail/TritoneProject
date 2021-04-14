using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TritonBackend.Models;

namespace TritonBackend.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<AuthOptions> authOptions;
        private readonly TritonDbContext context;

        public AuthController(TritonDbContext context, IOptions<AuthOptions> authOptions)
        {
            this.context = context;
            this.authOptions = authOptions;
        }

        [Route("api/login")]
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = context.Users.SingleOrDefault(u => u.Login == request.login && u.Password == request.password);

            if (user != null)
            {
                return Ok(new { accessToken = GenerateJWT(user) });
            }
            else
            {
                return Unauthorized();
            }
        }

        private string GenerateJWT(User user)
        {
            AuthOptions authParams = authOptions.Value;
            SymmetricSecurityKey securityKey = authParams.GetSymmetricSecurityKey();
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim("name", user.Name),
                new Claim("surname", user.Surname),
                new Claim("patronymic", user.Patronymic),
                new Claim("login", user.Login),
                new Claim("role", user.RoleId.ToString())
            };

            JwtSecurityToken token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
