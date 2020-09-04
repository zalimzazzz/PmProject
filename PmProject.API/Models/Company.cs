using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class Company : BaesClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsDelete { get; set; }
        public virtual ICollection<SurveyHeaders> SurveyHeaders { get; set; }
        // public virtual ICollection<User> User { get; set; }
    }
}