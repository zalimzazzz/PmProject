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
        public async Task<IActionResult> Get()
        {
            return Ok(await _repo.Get());
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
        public async Task<IActionResult> Add([FromBody] ServiceOrder templateServiceOrder)
        {
            if (await _repo.Add(templateServiceOrder))
            {
                return Ok();
            };
            return BadRequest("Could not add the Service Order");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ServiceOrder serviceOrder)
        {

            if (await _repo.Update(serviceOrder))
            {
                return Ok();
            };
            return BadRequest("Could not update the Service Order");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (await _repo.Delete(id))
            {
                return Ok(true);
            };
            return BadRequest("Could not delete the  Service Order");
        }
    }
}