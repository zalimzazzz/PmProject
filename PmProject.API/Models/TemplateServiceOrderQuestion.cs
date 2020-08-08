using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class TemplateServiceOrderQuestion : BaesClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid TemplateServiceOrderId { get; set; }
        public TemplateServiceOrder TemplateServiceOrder { get; set; }
        public Guid TemplateServiceOrderAnswerId { get; set; }
        public Company TemplateServiceOrderAnswer { get; set; }
    }
}