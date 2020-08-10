using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class ServiceOrder : BaesClass
    {
        public Guid Id { get; set; }
        public string ServiceOrderNo { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public byte CustomerSignature { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        public Guid TechnicianId { get; set; }
        public Technician Technician { get; set; }
    }
}