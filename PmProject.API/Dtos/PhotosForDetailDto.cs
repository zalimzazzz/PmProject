using System;

namespace PmProject.API.Dtos
{
    public class PhotosForDetailDto
    {
        public Guid Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }
    }
}