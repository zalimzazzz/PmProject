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

        public async Task<List<User>> GetTechnician()
        {
            return await _context.Users.Where(f => !f.IsDelete && f.RoleId == 2).ToListAsync();
        }
        //  public async Task<List<User>> GetTechnician(Guid id)
        // {
        //     return await _context.Users.Where(f => !f.IsDelete && f.Id == id && f.RoleId == 2).ToListAsync();
        // }
    }
}