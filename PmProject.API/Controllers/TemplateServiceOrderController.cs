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
    public class TemplateServiceOrderController : ControllerBase
    {
        private readonly ITemplateServiceOrderRepository _repo;
        private readonly IMapper _mapper;
        public TemplateServiceOrderController(ITemplateServiceOrderRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTemplateServiceOrder()
        {
            var companyId = Guid.Parse(User.FindFirst("CompanyId").Value);
            var resulte = await _repo.GetAll(companyId);
            return Ok(resulte);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTemplateServiceOrder(Guid id)
        {
            var resulte = await _repo.GetTemplateServiceOrder(id);
            return Ok(resulte);
        }

        [HttpPost]
        public async Task<IActionResult> AddTemplateServiceOrder([FromBody] TemplateServiceOrderDto templateServiceOrder)
        {
            // if (await _repo.CompanyExists(companyForCreationDto.Name))
            //     return BadRequest("Company already exists");

            var _templateServiceOrder = _mapper.Map<TemplateServiceOrder>(templateServiceOrder);

            var companyId = Guid.Parse(User.FindFirst("CompanyId").Value);
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            _templateServiceOrder.CompanyId = companyId;
            _templateServiceOrder.CreateBy = userId;
            _templateServiceOrder.ModifiedBy = userId;

            if (await _repo.Add(_templateServiceOrder))
            {
                return Ok();
            };
            return BadRequest("Could not add the Template Service Order");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTemplateServiceOrder(Guid id, [FromBody] TemplateServiceOrderDto templateServiceOrder)
        {
            var _templateServiceOrder = _mapper.Map<TemplateServiceOrder>(templateServiceOrder);

            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            _templateServiceOrder.ModifiedBy = userId;

            if (await _repo.UpdateTemplateServiceOrder(_templateServiceOrder))
            {
                return Ok();
            };
            return BadRequest("Could not update the Template Service Order");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateServiceOrder(Guid id)
        {
            if (await _repo.Delete(id))
            {
                return Ok(true);
            };
            //if (userId != Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return BadRequest("Could not delete the Template Service Order");
        }
    }
}