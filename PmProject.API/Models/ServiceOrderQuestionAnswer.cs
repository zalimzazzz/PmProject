using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class ServiceOrderQuestionAnswer : BaesClass
    {
        public Guid Id { get; set; }
        public string Answer { get; set; }
        public string Question { get; set; }
        public string AnswerInput { get; set; }
        public string AnswerOne { get; set; }
        public string AnswerMany { get; set; }

        public Guid ServiceOrderQuestionId { get; set; }
        public ServiceOrderQuestion ServiceOrderQuestion { get; set; }

    }
}