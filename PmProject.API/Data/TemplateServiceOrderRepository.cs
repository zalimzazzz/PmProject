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

        void ITemplateServiceOrderRepository.Add(TemplateServiceOrder templateServiceOrder)
        {
            throw new NotImplementedException();
        }

        void ITemplateServiceOrderRepository.Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        Task<List<TemplateServiceOrder>> ITemplateServiceOrderRepository.GetTemplateServiceOrder()
        {
            throw new NotImplementedException();
        }

        Task<TemplateServiceOrder> ITemplateServiceOrderRepository.GetTemplateServiceOrder(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}