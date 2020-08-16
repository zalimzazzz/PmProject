using System;

namespace PmProject.API.Dtos
{
    public class TemplateServiceOrderAnswerDto
    {
        public Guid Id { get; set; }
        public string Answer { get; set; }
        public Guid TemplateServiceOrderQuestionId { get; set; }
        public TemplateServiceOrderQuestionDto TemplateServiceOrderQuestion { get; set; }
    }
}