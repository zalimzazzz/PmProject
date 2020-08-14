using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Helpers;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface ITemplateServiceOrderRepository
    {
        Task<bool> Add(TemplateServiceOrder templateServiceOrder);
        void Delete(Guid id);
        Task<List<TemplateServiceOrder>> GetTemplateServiceOrder();
        Task<TemplateServiceOrder> GetTemplateServiceOrder(Guid id);
    }
}