using System;

namespace PmProject.API.Models
{
    public class SurveyHeaders
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CompanyId { get; set; }
    }
}