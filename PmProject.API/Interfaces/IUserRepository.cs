using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetTechnician(Guid id);

        Task<List<User>> GetAdmin();
    }
}