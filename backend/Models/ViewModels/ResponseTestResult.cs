using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TritonBackend.Models.ViewModels
{
    public class ResponseTestResult
    {
        public int questionId { get; set; }
        public string answerText { get; set; }
        public bool isRight { get; set; }
    }
}
