using System;
using System.Threading.Tasks;
using PmProject.API.Helpers;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface IProjectManagementRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(Guid id);
        Task<Photo> GetPhoto(Guid id);
        Task<Photo> GetMainPhotoForUser(Guid userId);
        Task<bool> Delete(Guid id);

    }
}