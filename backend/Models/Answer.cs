using System;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        [MaxLength(300)]
        public string AnswerText { get; set; }
        public bool isRight { get; set; }
    }
}
