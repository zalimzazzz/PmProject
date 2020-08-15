using System;

namespace PmProject.API.Dtos
{
    public class ProjectDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }

        public Guid TemplateServiceOrderId { get; set; }
    }
}