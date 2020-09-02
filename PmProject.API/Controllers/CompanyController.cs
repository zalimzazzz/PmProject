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
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _repo;
        private readonly IMapper _mapper;
        public CompanyController(ICompanyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {
            var company = await _repo.GetCompany();
            return Ok(company);
        }

        [HttpGet("{id}", Name = "GetCompany")]
        public async Task<IActionResult> GetCompany(Guid id)
        {
            var company = await _repo.GetCompany(id);

            var companyToReturn = _mapper.Map<CompanyForReturnDto>(company);

            return Ok(companyToReturn);

        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] Company company)
        {
            if (await _repo.CompanyExists(company.Name))
                return BadRequest("Company already exists");

            try
            {
                _repo.Add<Company>(company);
                return Ok();

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Could not add the Company");
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }


            try
            {
                await _repo.Update(company);

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.Delete(id);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }
    }
}