using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TritonBackend.Models
{
    public class TestingResults
    {
        [Key]
        public int TestingResultId { get; set; }
        public Result Result { get; set; }
        public int CountTries { get; set; }
        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }
    }
}
