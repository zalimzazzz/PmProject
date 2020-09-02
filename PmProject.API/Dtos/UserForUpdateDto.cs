using System;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Dtos
{
    public class UserForUpdateDto
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        [MaxLength(10)]
        public string PhoneNumber { get; set; }

    }
}