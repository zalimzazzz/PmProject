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
        public async Task<bool> Add(TemplateServiceOrder templateServiceOrder)
        {
            templateServiceOrder.Id = Guid.NewGuid();
            templateServiceOrder.CompanyId = Guid.Parse("1b7b50b8-6886-4463-9391-64c68a215ea9");
            _context.Add(templateServiceOrder);
            foreach (var templateServiceOrderQuestion in templateServiceOrder.TemplateServiceOrderQuestion)
            {
                foreach (var templateServiceOrderAnswer in templateServiceOrderQuestion.TemplateServiceOrderAnswer)
                {
                    templateServiceOrderAnswer.TemplateServiceOrderQuestionId = templateServiceOrderQuestion.Id;
                    _context.Add(templateServiceOrderAnswer);

                }
                _context.Add(templateServiceOrderQuestion);
            }
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Add(Project project)
        {
            _context.Add(project);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}