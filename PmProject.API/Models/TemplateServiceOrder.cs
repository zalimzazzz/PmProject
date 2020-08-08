using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class TemplateServiceOrder : BaesClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}