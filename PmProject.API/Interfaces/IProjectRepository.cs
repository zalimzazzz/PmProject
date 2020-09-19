using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Helpers;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface IProjectRepository
    {
        Task<bool> Add(Project project);
        Task<List<Project>> GetAll(Guid companyId);
        Task<Project> Get(Guid id);
        Task<bool> Update(Project project);
        Task<bool> Delete(Guid id);
    }
}