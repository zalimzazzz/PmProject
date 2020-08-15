using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PmProject.API.Data;
using PmProject.API.Dtos;
using PmProject.API.Helpers;
using PmProject.API.Interfaces;
using PmProject.API.Models;

namespace PmProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _repo;
        private readonly IMapper _mapper;
        public ProjectController(IProjectRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return Ok();

        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProjectDto projectDto)
        {

            var project = _mapper.Map<Project>(projectDto);

            if (await _repo.Add(project))
            {
                return Ok(project);
            }
            return BadRequest("Could not add the Company");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] string name)
        {
            //return Unauthorized();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            //if (userId != Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //return Unauthorized();
        }
    }
}