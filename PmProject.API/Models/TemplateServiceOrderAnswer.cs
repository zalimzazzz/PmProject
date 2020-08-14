using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class TemplateServiceOrderAnswer : BaesClass
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Answer { get; set; }
        [Required]
        public Guid TemplateServiceOrderQuestionId { get; set; }
        public TemplateServiceOrderQuestion TemplateServiceOrderQuestion { get; set; }
    }
}