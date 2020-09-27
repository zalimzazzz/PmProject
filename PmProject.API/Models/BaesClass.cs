using System;
using System.Collections.Generic;

namespace PmProject.API.Models
{
    public class BaesClass
    {
        public BaesClass()
        {
            this.ModifiedDate = DateTime.Now;

            // if (this.ModifiedDate == new DateTime())
            this.ModifiedDate = DateTime.Now;

        }
        public Guid CreateBy { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
}