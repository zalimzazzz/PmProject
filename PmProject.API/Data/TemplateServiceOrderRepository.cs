using System;
using System.Collections.Generic;
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

        public void Add(TemplateServiceOrder templateServiceOrder)
        {
            throw new NotImplementedException();
        }

        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<TemplateServiceOrder>> GetTemplateServiceOrder()
        {
            throw new NotImplementedException();
        }

        public Task<TemplateServiceOrder> GetTemplateServiceOrder(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}