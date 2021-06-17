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
        [HttpPost]
        public ActionResult EditQuestions([FromBody]EditQuestionRequest request)
        {
            if (_context.Questions.ToList().Exists(q => q.QuestionId == request.questionId))
            {
                Question question = _context.Questions.Single(q => q.QuestionId == request.questionId);
                List<Answer> answers = _context.Answers.Where(a => a.QuestionId == question.QuestionId).ToList();

                for (int i = 0; i < request.answers.Length; i++)
                {
                    answers[i].AnswerText = request.answers[i].answerText;
                    answers[i].isRight = (bool)request.answers[i].answerRight;
                    _context.Entry(answers[i]).State = EntityState.Modified;
                }

                _context.SaveChanges();
            }
            else
            {
                Quiz quiz = _context.Quizzes.Single(q => q.QuizId == 1);
                _context.Questions.Add(new Question
                {
                    QuizId = quiz.QuizId,
                    QuestionText = request.questionText
                });

                _context.SaveChanges();

                int questionLastId = _context.Questions.Max(q => q.QuestionId);

                foreach (var answer in request.answers)
                {
                    _context.Answers.Add(new Answer { QuestionId = questionLastId, AnswerText = answer.answerText, isRight = (bool)answer.answerRight });
                }

                _context.SaveChanges();
            }

            return Ok();
        }

        //[Authorize]
        [Route("api/editing/deleteQuestion")]
        [HttpPost]
        public ActionResult DeleteQuestion([FromBody] DeleteQuestionRequest request)
        {
            if (_context.Questions.ToList().Exists(q => q.QuestionId == request.questionId))
            {                
                Question question = _context.Questions.Single(q => q.QuestionId == request.questionId);
                _context.Questions.Remove(question);

                _context.SaveChanges();
            }

            return Ok();
        }

        //[Authorize]
        [Route("api/editing/editGroup")]
        [HttpPost]
        public ActionResult EditGroups([FromBody] EditGroupRequest request)
        {
            if (_context.Groups.ToList().Exists(q => q.GroupId == request.groupId))
            {
                Group group = _context.Groups.Single(q => q.GroupId == request.groupId);

                group.GroupName = request.groupName;                
                _context.Entry(group).State = EntityState.Modified;

                _context.SaveChanges();
            }
            else
            {
                _context.Groups.Add(new Group
                {
                    GroupName = request.groupName,
                });
                _context.SaveChanges();
            }

            return Ok();
        }

        //[Authorize]
        [Route("api/editing/deleteGroup")]
        [HttpPost]
        public ActionResult DeleteGroup([FromBody] DeleteGroupRequest request)
        {
            if (_context.Groups.ToList().Exists(q => q.GroupId == request.groupId))
            {
                Group group = _context.Groups.Single(q => q.GroupId == request.groupId);
                _context.Groups.Remove(group);

                _context.SaveChanges();
            }

            return Ok();
        }

    }
}
