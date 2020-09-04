using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PmProject.API.Helpers;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface ICompanyRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<Company>> GetCompanies();
        Task<Company> GetCompany(Guid id);
        Task<bool> CompanyExists(string name);
        Task<bool> Update(Company company);
        Task<bool> Delete(Guid id);

        Task<List<Company>> GetCompany();
    }
}