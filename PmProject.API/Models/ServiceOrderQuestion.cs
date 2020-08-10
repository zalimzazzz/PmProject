using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class ServiceOrderQuestion : BaesClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Question { get; set; }
        public int AnswerType { get; set; }
        public Guid ServiceOrderId { get; set; }
        public ServiceOrder ServiceOrder { get; set; }
    }
}