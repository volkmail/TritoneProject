using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }
        [MaxLength(300)]
        public string QuestionText { get; set; }
        public ICollection<Answer> Answers { get; set; }
        public Question() => Answers = new List<Answer>();
    }
}
