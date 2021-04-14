using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class Group
    {
        [Key]
        public int GroupId { get; set; }
        public string GroupName { get; set; }

        public ICollection<Student> Students {get;set;}

        public Group() => Students = new List<Student>();
    }
}
