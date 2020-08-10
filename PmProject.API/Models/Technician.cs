using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class Technician : BaesClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}