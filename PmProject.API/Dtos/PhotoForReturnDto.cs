using System;

namespace PmProject.API.Dtos
{
    public class PhotoForReturnDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
    }
}