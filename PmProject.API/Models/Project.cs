using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class Project : BaesClass
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public int Status { get; set; }
        public bool IsDelete { get; set; }

        public Guid TemplateServiceOrderId { get; set; }
        public TemplateServiceOrder TemplateServiceOrder { get; set; }
    }
}