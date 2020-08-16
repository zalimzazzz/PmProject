using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PmProject.API.Helpers;
using PmProject.API.Interfaces;
using PmProject.API.Models;

namespace PmProject.API.Data
{
    public class ServiceOrderRepository : IServiceOrderRepository
    {
        private readonly DataContext _context;
        public ServiceOrderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ServiceOrder> Get(Guid projectId)
        {
            var z = await _context.ServiceOrder.Include(i => i.ServiceOrderQAndA)
                                                .FirstOrDefaultAsync(f => f.ProjectId == projectId);
            return z;
        }


        public async Task<List<TemplateServiceOrderQuestion>> GetQuestion(Guid projectId)
        {
            var project = await _context.Project.Include(i => i.TemplateServiceOrder)
                                            .ThenInclude(t => t.TemplateServiceOrderQuestion)
                                                .ThenInclude(t => t.TemplateServiceOrderAnswer)
                                                .FirstAsync(f => f.Id == projectId);
            return project.TemplateServiceOrder.TemplateServiceOrderQuestion;
        }



        public Task<bool> UpdateTemplateServiceOrder(ServiceOrder templateServiceOrder)
        {
            throw new NotImplementedException();
        }

    }
}