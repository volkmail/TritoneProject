using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class Result
    {
        [Key]
        public int ResultId { get; set; }
        public int DataSetId { get; set; }
        public DataSet DataSet { get; set; }
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public Student Student { get; set; }

        public ICollection<CheckPoint> CheckPoints { get; set; }
        
        public Result() => CheckPoints = new List<CheckPoint>();
    }
}
