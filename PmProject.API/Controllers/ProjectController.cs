using System;
using System.Collections.Generic;
using System.Security.Claims;
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
        public async Task<IActionResult> Get()
        {
            var companyId = Guid.Parse(User.FindFirst("CompanyId").Value);

            return Ok(await _repo.GetAll(companyId));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await _repo.Get(id));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProjectDto projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);
            var companyId = Guid.Parse(User.FindFirst("CompanyId").Value);
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            project.CompanyId = companyId;
            project.CreateBy = userId;
            project.ModifiedBy = userId;

            if (await _repo.Add(project))
            {
                return Ok();
            }
            return BadRequest("Could not add the Project");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] ProjectDto projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);

            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            project.ModifiedBy = userId;

            if (await _repo.Update(project))
            {
                return Ok();
            }
            return BadRequest("Could not update the Project");
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (await _repo.Delete(id))
            {
                return Ok(true);
            };
            return BadRequest("Could not delete the Project");
        }
    }
}