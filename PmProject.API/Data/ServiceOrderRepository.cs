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
        public async Task<List<ServiceOrder>> GetAll(Guid companyId)
        {
            var result = await _context.ServiceOrder.Include(i => i.Project).Where(w => !w.IsDelete && w.CompanyId == companyId)?.ToListAsync();
            return result;
        }

        public async Task<ServiceOrder> Get(Guid id)
        {
            return await _context.ServiceOrder.Include(i => i.ServiceOrderQAndA)
                                                .Include(i => i.ServiceOrderImage)
                                                .Include(i => i.Project)
                                                .FirstOrDefaultAsync(f => f.Id == id && !f.IsDelete);
        }
        public async Task<List<ServiceOrder>> GetByTechnicianId(Guid userId)
        {
            return await _context.ServiceOrder.Where(f => f.UserId == userId && !f.IsDelete).ToListAsync();
        }
        public async Task<List<TemplateServiceOrderQuestion>> GetQuestion(Guid projectId)
        {
            var project = await _context.Project.Include(i => i.TemplateServiceOrder)
                                            .ThenInclude(t => t.TemplateServiceOrderQuestion)
                                                .ThenInclude(t => t.TemplateServiceOrderAnswer)
                                                .FirstAsync(f => f.Id == projectId && !f.IsDelete);
            return project.TemplateServiceOrder.TemplateServiceOrderQuestion.OrderBy(b => b.No).ToList();
        }
        public async Task<bool> Add(ServiceOrder serviceOrder)
        {
            _context.Add(serviceOrder);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> Update(ServiceOrder serviceOrder)
        {
            var _serviceOrder = await _context.ServiceOrder.Include(i => i.ServiceOrderImage).FirstAsync(f => f.Id == serviceOrder.Id);
            _context.ServiceOrder.RemoveRange(_serviceOrder);
            _context.Update(serviceOrder);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> Delete(Guid id)
        {
            var serviceOrder = await _context.ServiceOrder.FirstOrDefaultAsync(f => f.Id == id);
            serviceOrder.IsDelete = true;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}