using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TritonBackend.Models.ViewModels
{
    public class EditQuestionRequest
    {
        public int questionId { get; set; }
        public string questionText { get; set; }
        public List<ResponseAnswer> answers { get; set; }
    }
}
