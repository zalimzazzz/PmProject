using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PmProject.API.Data;
using PmProject.API.Dtos;
using PmProject.API.Interfaces;
using PmProject.API.Models;

namespace PmProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOrderController : ControllerBase
    {
        private readonly IServiceOrderRepository _repo;
        private readonly IMapper _mapper;
        public ServiceOrderController(IServiceOrderRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTemplateServiceOrder()
        {
            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var resulte = await _repo.Get(id);
            if (resulte != null)
                return Ok(resulte);

            return Ok();
        }


        [HttpGet("Question/{id}")]
        public async Task<IActionResult> GetQuestion(Guid id)
        {
            return Ok(await _repo.GetQuestion(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddTemplateServiceOrder([FromBody] TemplateServiceOrderDto templateServiceOrder)
        {
            // // if (await _repo.CompanyExists(companyForCreationDto.Name))
            // //     return BadRequest("Company already exists");

            // var _templateServiceOrder = _mapper.Map<TemplateServiceOrder>(templateServiceOrder);

            // if (await _repo.Add(_templateServiceOrder))
            // {
            //     return Ok(templateServiceOrder);
            // };
            return BadRequest("Could not add the Template Service Order");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTemplateServiceOrder(Guid id, [FromBody] TemplateServiceOrderDto templateServiceOrder)
        {
            //     var _templateServiceOrder = _mapper.Map<TemplateServiceOrder>(templateServiceOrder);

            //     if (await _repo.UpdateTemplateServiceOrder(_templateServiceOrder))
            //     {
            //         return Ok(templateServiceOrder);
            //     };
            return BadRequest("Could not update the Template Service Order");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateServiceOrder(Guid id)
        {
            // if (await _repo.Delete(id))
            // {
            //     return Ok(true);
            // };
            //if (userId != Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return BadRequest("Could not delete the Template Service Order");
        }
    }
}