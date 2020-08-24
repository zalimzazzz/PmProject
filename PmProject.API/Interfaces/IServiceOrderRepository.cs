using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface IServiceOrderRepository
    {
        Task<List<TemplateServiceOrderQuestion>> GetQuestion(Guid id);
        Task<List<ServiceOrder>> Get();
        Task<ServiceOrder> Get(Guid projectId);
        Task<bool> Add(ServiceOrder serviceOrder);
        Task<bool> Update(ServiceOrder serviceOrder);
        Task<bool> Delete(Guid id);
    }
}