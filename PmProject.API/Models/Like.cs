using System;

namespace PmProject.API.Models
{
    public class Like
    {
        public Guid LikerId { get; set; }
        public Guid LikeeId { get; set; }
        public virtual User Liker { get; set; }
        public virtual User Likee { get; set; }
    }
}