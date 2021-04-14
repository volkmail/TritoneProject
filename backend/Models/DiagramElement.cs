using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TritonBackend.Models
{
    public class DiagramElement
    {
        [Key]
        public int ElementId { get; set; }
        [MaxLength(50)]
        public string ElementName { get; set; }
        [MaxLength(100)]
        public string ElementImageSrc { get; set; }
    }
}
