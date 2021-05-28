using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class Quiz
    {
        [Key]
        public int QuizId { get; set; }
        [MaxLength(300)]
        public string QuizName { get; set; }
        public int TestingResultId { get; set; }
        public TestingResults TestingResults { get; set; }
        public ICollection<Question> Questions { get; set; }
        public Quiz() => Questions = new List<Question>();
    }
}
