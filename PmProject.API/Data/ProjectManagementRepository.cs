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
    public class ProjectManagementRepository : IProjectManagementRepository
    {
        private readonly DataContext _context;
        public ProjectManagementRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }



        public async Task<Photo> GetMainPhotoForUser(Guid userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId)
                .FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(Guid id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<User> GetUser(Guid id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == id);

            return user;
        }
        public async Task<bool> Delete(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(f => f.Id == id);
            user.IsDelete = true;
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(p => p.Photos)
                .OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            // users = users.Where(u => u.Gender == userParams.Gender);

            // if (userParams.Likers)
            // {
            //     var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
            //     users = users.Where(u => userLikers.Contains(u.Id));
            // }

            // if (userParams.Likees)
            // {
            //     var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
            //     users = users.Where(u => userLikees.Contains(u.Id));
            // }

            // if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            // {
            //     var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            //     var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            //     users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            // }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        // private async Task<IEnumerable<Guid>> GetUserLikes(Guid id, bool likers)
        // {
        //     var user = await _context.Users
        //         .FirstOrDefaultAsync(u => u.Id == id);

        //     if (likers)
        //     {
        //         return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
        //     }
        //     else
        //     {
        //         return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
        //     }
        // }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}