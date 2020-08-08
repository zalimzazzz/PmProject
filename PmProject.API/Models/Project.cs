using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class Project : BaesClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid TemplateServiceOrderId { get; set; }
        public Company TemplateServiceOrder { get; set; }
    }
}