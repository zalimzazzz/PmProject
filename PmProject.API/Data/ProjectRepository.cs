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
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;
        public ProjectRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> Add(Project project)
        {
            _context.Add(project);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Project>> GetAll(Guid companyId)
        {
            return await _context.Project.Include(i => i.TemplateServiceOrder).Where(w => !w.IsDelete && w.CompanyId == companyId).ToListAsync();
        }
        public async Task<Project> Get(Guid id)
        {
            return await _context.Project.FirstAsync(w => w.Id == id && !w.IsDelete);
        }
        public async Task<bool> Update(Project project)
        {
            var _project = await _context.Project.FirstAsync(f => f.Id == project.Id);
            _project.Name = project.Name;
            _project.TemplateServiceOrderId = project.TemplateServiceOrderId;
            _project.Status = project.Status;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Guid id)
        {
            var _project = await _context.Project.FirstAsync(f => f.Id == id);
            _project.IsDelete = true;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}