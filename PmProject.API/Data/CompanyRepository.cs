using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PmProject.API.Helpers;
using PmProject.API.Interfaces;
using PmProject.API.Models;

namespace PmProject.API.Data
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataContext _context;
        public CompanyRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<bool> CompanyExists(string name)
        {
            if (await _context.Company.AnyAsync(x => x.Name == name && !x.IsDelete))
                return true;

            return false;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<PagedList<Company>> GetCompanies()
        {
            var company = _context.Company.AsQueryable();

            return await PagedList<Company>.CreateAsync(company, 1, 10);
        }
        public async Task<List<Company>> GetCompany()
        {
            var company = await _context.Company.Where(w => !w.IsDelete).ToListAsync();

            return company;
        }

        public async Task<Company> GetCompany(Guid id)
        {
            var company = await _context.Company.FirstOrDefaultAsync(x => x.Id == id);

            return company;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(Company company)
        {
            _context.Update(company);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Guid id)
        {
            var company = await _context.Company.FirstOrDefaultAsync(x => x.Id == id);
            company.IsDelete = true;
            return await _context.SaveChangesAsync() > 0;
        }

    }
}