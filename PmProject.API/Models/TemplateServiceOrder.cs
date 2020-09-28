using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class TemplateServiceOrder : BaesClass
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
        public bool IsDelete { get; set; }
        public List<TemplateServiceOrderQuestion> TemplateServiceOrderQuestion { get; set; }
        public List<Project> Project { get; set; }
    }
}