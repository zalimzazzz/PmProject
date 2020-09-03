using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]

        public string FullName { get; set; }
        [MaxLength(10)]
        public string PhoneNumber { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public Guid? CompanyId { get; set; }
        public Company Company { get; set; }
        [Required]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public bool IsDelete { get; set; }

    }
}
