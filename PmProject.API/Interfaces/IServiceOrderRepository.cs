using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface IServiceOrderRepository
    {
        Task<List<TemplateServiceOrderQuestion>> GetQuestion(Guid projectId);
        Task<ServiceOrder> Get(Guid projectId);
    }
}