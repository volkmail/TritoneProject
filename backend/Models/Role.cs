using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }

        [MaxLength(10)]
        public string RoleName { get; set; }

        public ICollection<User> Users { get; set; }

        public Role() => Users = new List<User>();
    }
}
