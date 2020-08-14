using System;
using System.Collections.Generic;

namespace PmProject.API.Dtos
{
    public class TemplateServiceOrderDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CompanyId { get; set; }
        public CompanyForCreationDto Company { get; set; }
        public List<TemplateServiceOrderQuestionDto> TemplateServiceOrderQuestion { get; set; }
    }
}