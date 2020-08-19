using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using PmProject.API.Data;
using PmProject.API.Dtos;
using PmProject.API.Interfaces;
using PmProject.API.Models;

namespace PmProject.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOrderController : ControllerBase
    {
        private readonly IServiceOrderRepository _repo;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IMapper _mapper;
        public ServiceOrderController(IServiceOrderRepository repo, IMapper mapper, IHostingEnvironment hostingEnvironment)
        {
            _repo = repo;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
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

        [HttpPost("Upload"), DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet("Download/{id}")]
        public IActionResult Download(string id)
        {
            try
            {
                // Since this is just and example, I am using a local file located inside wwwroot
                // Afterwards file is converted into a stream
                var path = Path.Combine(_hostingEnvironment.WebRootPath + "\\Resources\\Images", "0011_0.jpg");
                var fs = new FileStream(path, FileMode.Open);

                // Return the file. A byte array can also be used instead of a stream
                return File(fs, "application/octet-stream", "0011_0.jpg");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}