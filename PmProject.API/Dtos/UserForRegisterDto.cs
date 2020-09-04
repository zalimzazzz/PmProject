using System;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8")]
        public string Password { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public Guid? CompanyId { get; set; }
        public int RoleId { get; set; }
        public string FullName { get; set; }
        [MaxLength(10)]
        public string PhoneNumber { get; set; }


        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}