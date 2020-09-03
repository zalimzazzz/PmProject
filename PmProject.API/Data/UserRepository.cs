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
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetTechnician(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(f => f.Id == id);
            return await _context.Users.Where(f => !f.IsDelete && f.RoleId == 2 && f.CompanyId == user.CompanyId).ToListAsync();
        }

        public async Task<List<User>> GetAdmin()
        {
            return await _context.Users.Include(i => i.Company).Where(f => !f.IsDelete && f.RoleId == 1).ToListAsync();
        }
    }
}