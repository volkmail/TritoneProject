using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class CheckPoint
    {
        [Key]
        public int CpId { get; set; }
        [MaxLength(15)]
        public string CpName { get; set; }
        public int ResultId { get; set; }
        public Result Result { get; set; }
        public bool IsActive { get; set; }
        public bool IsIn { get; set; }
        public bool IsOut { get; set; }
        public bool IsVibro { get; set; }
        public bool IsAcoustic { get; set; }
    }
}
