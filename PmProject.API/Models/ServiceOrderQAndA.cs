using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class ServiceOrderQAndA : BaesClass
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public Guid ServiceOrderId { get; set; }
        public ServiceOrder ServiceOrder { get; set; }
        public int AnswerTypeId { get; set; }
        
        public string Answer { get; set; }
        [Required]
        public Guid QuestionId { get; set; }
    }
}