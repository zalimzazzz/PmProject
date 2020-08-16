using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PmProject.API.Models
{
    public class ServiceOrder : BaesClass
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string ServiceOrderNo { get; set; }
        public string Description { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public byte CustomerSignature { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        [Required]
        public Guid TechnicianId { get; set; }
        public Technician Technician { get; set; }

        public List<ServiceOrderQAndA> ServiceOrderQAndA { get; set; }

    }
}