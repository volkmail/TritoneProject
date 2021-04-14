using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class DataSet
    {
        [Key]
        public int DataSetId { get; set; }
        public string? DataSetPath { get; set; }
        public ICollection<Result> Results { get; set; }
        public DataSet() => Results = new List<Result>();
    }
}
