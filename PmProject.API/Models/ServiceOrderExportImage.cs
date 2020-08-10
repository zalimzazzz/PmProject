using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class ServiceOrderExportImage : BaesClass
    {
        public Guid Id { get; set; }
        public int ImageLayout { get; set; }
        public int ExportCount { get; set; }
        public int LayoutNo { get; set; }
        public string ImagePath { get; set; }

        public Guid ServiceOrderExportId { get; set; }
        public ServiceOrderExport ServiceOrderExport { get; set; }

    }
}