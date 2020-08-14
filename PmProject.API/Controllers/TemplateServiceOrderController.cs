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
    public class TemplateServiceOrderController : ControllerBase
    {
        private readonly ICompanyRepository _repo;
        private readonly IMapper _mapper;
        public TemplateServiceOrderController(ICompanyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTemplateServiceOrder()
        {
            var company = await _repo.GetCompanies();

            var companyToReturn = _mapper.Map<IEnumerable<CompanyForReturnDto>>(company);

            Response.AddPagination(company.CurrentPage, company.PageSize,
                company.TotalCount, company.TotalPages);

            return Ok(companyToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTemplateServiceOrder(Guid id)
        {
            var company = await _repo.GetCompany(id);

            var companyToReturn = _mapper.Map<CompanyForReturnDto>(company);

            return Ok(companyToReturn);

        }

        [HttpPost]
        public async Task<IActionResult> AddTemplateServiceOrder([FromBody] TemplateServiceOrderDto templateServiceOrder)
        {
            // if (await _repo.CompanyExists(companyForCreationDto.Name))
            //     return BadRequest("Company already exists");

            // var company = _mapper.Map<Company>(companyForCreationDto);

            // _repo.Add<Company>(company);

            // if (await _repo.SaveAll())
            // {
            //     var companyToReturn = _mapper.Map<CompanyForReturnDto>(company);
            //     return CreatedAtRoute("GetCompanies", new
            //     {
            //         controller = "Company",
            //         id = company.Id
            //     }, companyToReturn);
            // };

            // return BadRequest("Could not add the Company");
            return Ok(templateServiceOrder);
        }

        [HttpPut("{id}")]
        public void UpdateTemplateServiceOrder(Guid id, [FromBody] string name)
        {
            //return Unauthorized();
        }

        [HttpDelete("{id}")]
        public void DeleteTemplateServiceOrder(Guid id)
        {
            //if (userId != Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //return Unauthorized();
        }
    }
}