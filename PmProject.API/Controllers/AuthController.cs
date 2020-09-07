using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PmProject.API.Data;
using PmProject.API.Dtos;
using PmProject.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using PmProject.API.Interfaces;
using System.Collections.Generic;

namespace PmProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if (userForRegisterDto.RoleId == 3)
                return Unauthorized();
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailDto>(createdUser);

            return CreatedAtRoute("GetUser", new
            {
                controller = "Users",
                id = createdUser.Id
            }, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username
                .ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);

            var menus = new List<Routes>();
            bool isAdmin = userFromRepo.RoleId == 1;
            bool isTechnician = userFromRepo.RoleId == 2;
            bool isAdminSystem = userFromRepo.RoleId == 3;
            if (isAdmin)
            {
                menus.Add(CrateRoutes("/template", "แบบฟอร์มเอกสารใบสั่งงาน"));
                // menus.Add(CrateRoutes("/company", "Company"));
                menus.Add(CrateRoutes("/project", "ข้อมูลโครงการ"));
                menus.Add(CrateRoutes("/serviceOrder", "ข้อมูลใบสั่งงาน"));
                menus.Add(CrateRoutes("/technician", "ข้อมูลช่าง"));

            }
            else if (isAdmin)
            {
                menus.Add(CrateRoutes("/template", "แบบฟอร์มเอกสารใบสั่งงาน"));
                menus.Add(CrateRoutes("/project", "ข้อมูลโครงการ"));
                menus.Add(CrateRoutes("/serviceOrder", "ข้อมูลใบสั่งงาน"));
            }
            else if (isTechnician)
            {
                menus.Add(CrateRoutes("/service-order/technician", "ข้อมูลใบสั่งงาน"));
            }
            else if (isAdminSystem)
            {
                menus.Add(CrateRoutes("/company", "Company"));
                menus.Add(CrateRoutes("/user-management", "User Management"));

            }
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user = user,
                menus = menus
            });
        }
        private Routes CrateRoutes(string path, string name)
        {
            var menu = new Routes();
            menu.Name = name;
            menu.Path = path;
            return menu;
        }
    }
}