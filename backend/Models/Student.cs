using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TritonBackend.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public Result Result { get; set; }

        public int GroupId {get; set; }
        public Group Group { get; set; }
    }
}
