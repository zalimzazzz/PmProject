using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class TemplateServiceOrderQuestion : BaesClass
    {
        [Required]
        public Guid Id { get; set; }
        [Required]

        public string Name { get; set; }
        [Required]
        public int AnswerTypeId { get; set; }
        // public Guid TemplateServiceOrderId { get; set; }
        public TemplateServiceOrder TemplateServiceOrder { get; set; }
        public Guid TemplateServiceOrderAnswerId { get; set; }
        public List<TemplateServiceOrderAnswer> TemplateServiceOrderAnswer { get; set; }
    }
}