using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class TestingResults
    {
        [Key]
        public int TestingResultId { get; set; }
        public int ResultId { get; set; }
        public Result Result { get; set; }
        public int CountTries { get; set; }
        public ICollection<Quiz> Quizes { get; set; }
        public TestingResults() => Quizes = new List<Quiz>();
    }
}
