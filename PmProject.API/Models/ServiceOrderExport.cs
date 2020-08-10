using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class ServiceOrderExport : BaesClass
    {
        public Guid Id { get; set; }
        public string ImagePath { get; set; }
        public int ImageLayout { get; set; }
        public int ExportCount { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

    }
}