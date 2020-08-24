using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class Role
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}