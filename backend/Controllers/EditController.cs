using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TritonBackend.Models;
using TritonBackend.Models.ViewModels;

namespace TritonBackend.Controllers
{
    public class EditController : Controller
    {
        private readonly TritonDbContext _context;
        private readonly IWebHostEnvironment env;

        private int userId => int.Parse(User.Claims.Single(c => c.Type == "userId").Value);

        public EditController(TritonDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env = env;
        }

        //[Authorize]
        [Route("api/editing/getGroups")]
        [HttpGet]
        public ActionResult GetGroups()
        {
            List<Group> groups = _context.Groups.ToList();
            List<GroupResponse> groupResponse = new List<GroupResponse>();
            foreach (Group group in groups)
            {
                groupResponse.Add(new GroupResponse
                {
                    groupId = group.GroupId,
                    groupName = group.GroupName
                });
            }

            return Ok(new { groupResponse });
        }

        //[Authorize]
        [Route("api/editing/getTest")]
        [HttpGet]
        public ActionResult GetTest()
        {
            ResponseTestData test = null;
            List<Question> questions = _context.Questions.Where(q => q.QuizId == 1).ToList();

            if (questions != null)
            {
                test = new ResponseTestData
                {
                    quizId = 1,
                    quizName = "Тестовый блок",
                    questions = new List<ResponseQuestion>()
                };

                foreach (Question question in questions)
                {
                    List<Answer> answers = _context.Answers.Where(a => a.QuestionId == question.QuestionId).ToList();
                    List<ResponseAnswer> responseAnswers = new List<ResponseAnswer>();

                    foreach (Answer answer in answers)
                    {
                        responseAnswers.Add(new ResponseAnswer
                        {
                            answerId = answer.AnswerId,
                            answerText = answer.AnswerText,
                            answerRight = answer.isRight
                        });
                    }

                    test.questions.Add(new ResponseQuestion
                    {
                        questionId = question.QuestionId,
                        questionText = question.QuestionText,
                        answers = responseAnswers
                    });
                }
            }

            return Ok(new { test });
        }

        //[Authorize]
        [Route("api/editing/editTest")]
        [HttpGet]
        public ActionResult EditQuestions(EditQuestionRequest request)
        {
            if (_context.Questions.ToList().Exists(q => q.QuestionId == request.questionId))
            {
                Question question = _context.Questions.Single(q => q.QuestionId == request.questionId);
                List<Answer> answers = _context.Answers.Where(a => a.QuestionId == question.QuestionId).ToList();

                for (int i = 0; i < request.answers.Count; i++)
                {
                    answers[i].AnswerText = request.answers[i].answerText;
                    answers[i].isRight = (bool)request.answers[i].answerRight;
                    _context.Entry(answers).State = EntityState.Modified;
                }

                _context.SaveChanges();
            }
            else 
            {
                Quiz quiz = _context.Quizzes.Single(q => q.QuizId == 1);
                _context.Questions.Add(new Question
                {
                    QuestionId = request.questionId,
                    QuizId = quiz.QuizId,
                    QuestionText = request.questionText
                });

                _context.SaveChanges();

                foreach (var answer in request.answers)
                {
                    _context.Answers.Add(new Answer { AnswerText = answer.answerText, isRight = (bool)answer.answerRight });
                }

                _context.SaveChanges();                
            }

            return Ok();
        }

    }
}
