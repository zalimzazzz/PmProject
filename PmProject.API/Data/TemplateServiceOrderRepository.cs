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
    public class TemplateServiceOrderRepository : ITemplateServiceOrderRepository
    {
        private readonly DataContext _context;
        public TemplateServiceOrderRepository(DataContext context)
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
                if (templateServiceOrderQuestion.AnswerTypeId != 1) // Type Text
                {
                    foreach (var templateServiceOrderAnswer in templateServiceOrderQuestion.TemplateServiceOrderAnswer)
                    {
                        templateServiceOrderAnswer.TemplateServiceOrderQuestionId = templateServiceOrderQuestion.Id;
                        _context.Add(templateServiceOrderAnswer);

                    }
                }
                else
                {
                    templateServiceOrderQuestion.TemplateServiceOrderAnswer.Clear();
                }
                _context.Add(templateServiceOrderQuestion);
            }
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateTemplateServiceOrder(TemplateServiceOrder templateServiceOrder)
        {
            var template = await _context.TemplateServiceOrder.FirstOrDefaultAsync(f => f.Id == templateServiceOrder.Id && !f.IsDelete);
            template.Name = templateServiceOrder.Name;

            // remove all
            var templateServiceOrderQuestionRemoveItem = await _context.TemplateServiceOrderQuestion.Where(f => f.TemplateServiceOrderId == templateServiceOrder.Id).ToListAsync();
            foreach (var question in templateServiceOrderQuestionRemoveItem)
            {
                var templateServiceOrderAnswerRemoveItem = await _context.TemplateServiceOrderAnswer.Where(f => f.TemplateServiceOrderQuestionId == question.Id).ToListAsync();
                _context.TemplateServiceOrderAnswer.RemoveRange(templateServiceOrderAnswerRemoveItem);
                _context.TemplateServiceOrderQuestion.Remove(question);
            }
            var seved = await _context.SaveChangesAsync() > 0;
            // re add 
            foreach (var templateServiceOrderQuestion in templateServiceOrder.TemplateServiceOrderQuestion)
            {
                templateServiceOrderQuestion.TemplateServiceOrderId = template.Id;
                if (templateServiceOrderQuestion.AnswerTypeId != 1) // Type Text
                {
                    foreach (var templateServiceOrderAnswer in templateServiceOrderQuestion.TemplateServiceOrderAnswer)
                    {
                        templateServiceOrderAnswer.TemplateServiceOrderQuestionId = templateServiceOrderQuestion.Id;
                        _context.Add(templateServiceOrderAnswer);

                    }
                }
                else
                {
                    templateServiceOrderQuestion.TemplateServiceOrderAnswer.Clear();
                }
                _context.Add(templateServiceOrderQuestion);
            }
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> Delete(Guid id)
        {
            var template = await _context.TemplateServiceOrder.FirstOrDefaultAsync(f => f.Id == id);
            template.IsDelete = true;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<TemplateServiceOrder>> GetTemplateServiceOrder()
        {
            return await _context.TemplateServiceOrder.Where(w => !w.IsDelete).ToListAsync();
        }

        public async Task<TemplateServiceOrder> GetTemplateServiceOrder(Guid id)
        {
            return await _context.TemplateServiceOrder.Include(i => i.TemplateServiceOrderQuestion)
                                                            .ThenInclude(t => t.TemplateServiceOrderAnswer)
                                                            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDelete);
        }


    }
}