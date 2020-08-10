using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class TemplateServiceOrderAnswer : BaesClass
    {
        public Guid Id { get; set; }
        public string Answer { get; set; }
        public Guid TemplateServiceOrderQuestionId { get; set; }
        public TemplateServiceOrderQuestion TemplateServiceOrderQuestion { get; set; }

    }
}