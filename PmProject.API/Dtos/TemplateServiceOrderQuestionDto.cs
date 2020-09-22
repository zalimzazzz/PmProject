using System;
using System.Collections.Generic;

namespace PmProject.API.Dtos
{
    public class TemplateServiceOrderQuestionDto
    {
        public Guid Id { get; set; }
        public int No { get; set; }
        public string Name { get; set; }

        public int AnswerTypeId { get; set; }
        public Guid TemplateServiceOrderId { get; set; }
        public TemplateServiceOrderDto TemplateServiceOrder { get; set; }
        public List<TemplateServiceOrderAnswerDto> TemplateServiceOrderAnswer { get; set; }
    }
}