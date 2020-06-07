using System.Threading.Tasks;
using PmProject.API.Models;

namespace PmProject.API.Interfaces
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);

    }
}