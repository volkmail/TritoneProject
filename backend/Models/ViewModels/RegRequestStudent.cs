using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models.ViewModels
{
    public class RegRequestStudent
    {
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

        public string GroupName { get; set; }
    }
}
