using System.Collections.Generic;

namespace TritonBackend.Models.ViewModels
{
    public class ResponseTestData
    {
        public int quizId { get; set; } 
        public string quizName { get; set; }
        public List<ResponseQuestion> questions { get; set; }
    }

    public class ResponseQuestion
    {
        public int questionId { get; set; }
        public string questionText { get; set; }
        public List<ResponseAnswer> answers { get; set; }
    }

    public class ResponseAnswer
    {
        public int answerId { get; set; }
        public string answerText { get; set; }
    }  
}
