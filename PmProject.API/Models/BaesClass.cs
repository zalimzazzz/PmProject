using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class BaesClass
    {
        public Guid CreateBy { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
}