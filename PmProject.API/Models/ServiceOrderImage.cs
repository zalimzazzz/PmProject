using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class ServiceOrderImage : BaesClass
    {
        public Guid Id { get; set; }
        public string ImagePath { get; set; }
        public Guid ServiceOrderId { get; set; }
        public ServiceOrder ServiceOrder { get; set; }
    }
}