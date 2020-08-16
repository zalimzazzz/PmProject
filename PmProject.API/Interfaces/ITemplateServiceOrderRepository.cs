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
        Task<bool> UpdateTemplateServiceOrder(TemplateServiceOrder templateServiceOrder);
        Task<bool> Delete(Guid id);
        Task<List<TemplateServiceOrder>> GetTemplateServiceOrder();
        Task<TemplateServiceOrder> GetTemplateServiceOrder(Guid id);
    }
}