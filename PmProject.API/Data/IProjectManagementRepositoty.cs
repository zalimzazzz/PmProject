using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Models;

namespace PmProject.API.Data
{
    public interface IProjectManagementRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(Guid id);
    }
}