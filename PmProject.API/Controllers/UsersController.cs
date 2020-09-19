using PmProject.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using AutoMapper;
using PmProject.API.Dtos;
using System.Collections.Generic;
using System.Security.Claims;
using PmProject.API.Helpers;
using PmProject.API.Models;
using PmProject.API.Interfaces;

namespace PmProject.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IProjectManagementRepository _repo;
        private readonly IUserRepository _repoUser;
        private readonly IMapper _mapper;

        public UsersController(IProjectManagementRepository repo, IMapper mapper, IUserRepository repoUser)
        {
            _repo = repo;
            _mapper = mapper;
            _repoUser = repoUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            // if (string.IsNullOrEmpty(userParams.Gender))
            // {
            //     userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            // }

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailDto>(user);

            return Ok(userToReturn);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetAdmin()
        {
            var admin = await _repoUser.GetAdmin();
            var adminToReturn = _mapper.Map<List<UserForDetailDto>>(admin);

            return Ok(adminToReturn);
        }

        [HttpGet("technician/{id}")]
        public async Task<IActionResult> GetTechnician(Guid id)
        {

            var technician = await _repoUser.GetTechnician(id);

            var technicianoReturn = _mapper.Map<List<UserForDetailDto>>(technician);

            return Ok(technicianoReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, UserForUpdateDto userForUpdateDto)
        {

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {

            var userFromRepo = await _repo.Delete(id);
            if (userFromRepo)
            {
                return Ok();
            };
            throw new Exception($"Updating user {id} failed on delete");

        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(Guid id, Guid recipientId)
        {
            if (id != Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to like user");
        }
    }
}