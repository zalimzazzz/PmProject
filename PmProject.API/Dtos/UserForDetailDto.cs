using System;
using System.Collections.Generic;
using PmProject.API.Models;

namespace PmProject.API.Dtos
{
    public class UserForDetailDto
    {
        public Guid Id { get; set; }

        public string Username { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string PhotoUrl { get; set; }
        public bool IsDelete { get; set; }
        public string FullName { get; set; }
        public Guid? CompanyId { get; set; }
        public Company Company { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}