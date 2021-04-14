using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [MaxLength(20)]
        public string Login { get; set; }

        [MaxLength(20)]
        public string Password { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(20)]
        public string Surname { get; set; }

        [MaxLength(20)]
        public string Patronymic { get; set; }

        public Student Student { get; set; }

        public int RoleId {get; set; }
        public Role Role { get; set; }
    }
}
