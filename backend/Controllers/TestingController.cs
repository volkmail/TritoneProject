﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TritonBackend.Models;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.RegularExpressions;
using TritonBackend.Models.ViewModels;
using System.IO;

namespace TritonBackend.Controllers
{
    [ApiController]
    public class TestingController : ControllerBase
    {
        private readonly TritonDbContext _context;
        private readonly IWebHostEnvironment env;

        private int userId => int.Parse(User.Claims.Single(c => c.Type == "userId").Value);

        public TestingController(TritonDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env = env;
        }

        #region DigramRegion

        [Authorize]
        [Route("api/testing/getDiagramElements")]
        [HttpGet]
        public ActionResult GetDiagramElements()
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);

            if (result.TimeStart == null) 
            {
                result.TimeStart = DateTime.Now;
                _context.Entry(result).State = EntityState.Modified;
                _context.SaveChanges();
            }

            List<DiagramElement> diagramElements = _context.DiagramElements.Select(de => new DiagramElement()
            {
                ElementId = de.ElementId,
                ElementName = de.ElementName,
                ElementImageSrc = string.Format("{0}://{1}{2}/{3}",
                    Request.Scheme,
                    Request.Host,
                    Request.PathBase,
                    de.ElementImageSrc.Replace(@"\", @"/")),
                ElementText = de.ElementText ?? ""
            }).ToList();

            return Ok(new { data = diagramElements, ResultCode = 0 });
        }

        [Authorize]
        [HttpGet]
        [Route("api/testing/getCurrentDiagramStep")]
        public ActionResult GetCurrentDiagramStep()
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
            DiagramResults diagramResults = _context.DiagramResults.Single(r => r.DiagramResultId == result.DiagramResultId);

            string[] steps = new string[8] {
                diagramResults.step1 ?? "",
                diagramResults.step2 ?? "",
                diagramResults.step3 ?? "",
                diagramResults.step4 ?? "",
                diagramResults.step5 ?? "",
                diagramResults.step6 ?? "",
                diagramResults.step7 ?? "",
                diagramResults.step8 ?? ""
            };

            int currentStep = 1;

            for (int i = 0; i < steps.Length; i++)
            {
                if (steps[i] != "")
                    currentStep++;
                else
                    break;
            }

            return Ok(new { currentStep });
        }

        [Authorize]
        [HttpPut]
        [Route("api/testing/setCurrentDiagramStep")]
        public ActionResult SetCurrentDiagramStep(StepResultRequest request)
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
            DiagramResults diagramResults = _context.DiagramResults.Single(r => r.DiagramResultId == result.DiagramResultId);

            switch (request.stepNumber)
            {
                case 1:
                    {
                        diagramResults.step1 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 2:
                    {
                        diagramResults.step2 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 3:
                    {
                        diagramResults.step3 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 4:
                    {
                        diagramResults.step4 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 5:
                    {
                        diagramResults.step5 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 6:
                    {
                        diagramResults.step6 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 7:
                    {
                        diagramResults.step7 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 8:
                    {
                        diagramResults.step8 = request.stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
            }

            _context.SaveChanges();

            int currentStep = request.stepNumber + 1;

            return Ok(new { currentStep });
        }

        #endregion

        #region GeneralRegion

        [Authorize]
        [Route("api/testing/setSectionComplete")]
        [HttpPut]
        public ActionResult SetSectionComplete(RequestSectionComplete request)
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);

            switch (request.sectionNumber)
            {
                case 1:
                    {
                        result.Section1 = true;
                        _context.Entry(result).State = EntityState.Modified;
                        _context.SaveChanges();
                        break;
                    }
                case 2:
                    {
                        result.Section2 = true;
                        _context.Entry(result).State = EntityState.Modified;
                        _context.SaveChanges();
                        break;
                    }
                case 3:
                    {
                        result.Section3 = true;
                        result.TimeEnd = DateTime.Now;
                        _context.Entry(result).State = EntityState.Modified;
                        _context.SaveChanges();
                        break;
                    }
            }

            

            return Ok(new { isSectionResultSet = true });
        }

        [Authorize]
        [Route("api/testing/getSectionsProgress")]
        [HttpGet]
        public ActionResult GetSectionsProgress()
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
            bool[] sections = new bool[3] { result.Section1, result.Section2, result.Section3 };
          
            return Ok(new { sections});
        }


        #endregion

        #region DataCalcRegion

        [Authorize]
        [Route("api/testing/getDataSetInfo/{placeTypeName}")]
        [HttpGet]
        public ActionResult GetDataSetInfo(string placeTypeName)
        {
            List<Tuple<double, double>> dataSet = GenerateDataFromFile($"StaticFiles\\DataSets\\{placeTypeName}.txt");

            if (dataSet != null)
            {
                Random rnd = new Random(DateTime.Now.Millisecond);

                double[] frequency = new double[dataSet.Count];
                double[] signalLevelMax = new double[dataSet.Count];
                double[] signalLevel = new double[dataSet.Count];
                double[] signalLevelMin = new double[dataSet.Count];

                for (int i = 0; i < dataSet.Count; i++)
                {
                    frequency[i] = dataSet[i].Item1;
                    signalLevelMax[i] = dataSet[i].Item2;
                    signalLevel[i] = Math.Round(dataSet[i].Item2 - dataSet[i].Item2 * rnd.Next(3, 14) / 100, 1);
                    signalLevelMin[i] = Math.Round(dataSet[i].Item2 - dataSet[i].Item2 * rnd.Next(14, 21) / 100, 1);
                }

                return Ok(new { frequency, signalLevelMax, signalLevel, signalLevelMin });
            }

            return Ok(); //ПРИДУМАТЬ ОТВЕТ
        }

        [Authorize]
        [Route("api/testing/postCalcProgress")]
        [HttpPost]
        public ActionResult SaveCalcResult(DataSetPostRequest request)
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
            CalculationResults calculationResults = _context.CalculationResults.Single(r => r.CalculationResultId == result.CalculationResultId);

            calculationResults.CalculationResult = request.results;
            _context.Entry(calculationResults).State = EntityState.Modified;

            _context.SaveChanges();

            return Ok();
        }

        [Authorize]
        [Route("api/testing/getCalcProgress")]
        [HttpGet]
        public ActionResult GetCalcResult()
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
            CalculationResults calculationResults = _context.CalculationResults.Single(r => r.CalculationResultId == result.CalculationResultId);

            return Ok(new { pointSummaryProgress = calculationResults.CalculationResult });
        }

        private List<Tuple<double, double>> GenerateDataFromFile(string resultName)
        {
            string filePath = Path.Combine(env.ContentRootPath, resultName);

            if (System.IO.File.Exists(filePath))
            {
                List<Tuple<double, double>> dataResult = new List<Tuple<double, double>>();
                Random rnd = new Random(DateTime.Now.Millisecond);

                using (StreamReader sr = new StreamReader(filePath, System.Text.Encoding.Default))
                {
                    string line;

                    while ((line = sr.ReadLine()) != null)
                    {
                        if (Regex.IsMatch(line, "\t"))
                        {
                            string[] xy = line.Split('\t');
                            double signalLevelMax = 0;

                            switch (resultName)
                            {
                                case var _ when Regex.IsMatch(resultName, @"[SAZ, Test]"):
                                    {
                                        signalLevelMax = Math.Round(double.Parse(xy[1]) + double.Parse(xy[1]) * rnd.Next(-2, 3) / 100, 1);
                                        break;
                                    }
                                case var _ when Regex.IsMatch(resultName, @"Signal"):
                                    {
                                        signalLevelMax = Math.Round(double.Parse(xy[1]) + double.Parse(xy[1]) * rnd.Next(-5, 6) / 100, 1);
                                        break;
                                    }
                                case var _ when Regex.IsMatch(resultName, @"Back"):
                                    {
                                        signalLevelMax = Math.Round(double.Parse(xy[1]) + double.Parse(xy[1]) * rnd.Next(-3, 4) / 100, 1);
                                        break;
                                    }
                            }
                            dataResult.Add(new Tuple<double, double>(double.Parse(xy[0]), signalLevelMax));
                        }
                    }
                }

                return dataResult;
            }

            return null;
        }

        #endregion

        #region TestRegion

        [Authorize]
        [Route("api/testing/getTestData")]
        [HttpGet]
        public IActionResult GetTestData()
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
            TestingResults testingResult = _context.TestingResults.Single(r => r.TestingResultId == result.TestingResultId);

            ResponseTestData responseTestData = GetResponseTestData(_context.Quizzes.Single(q => q.QuizId == testingResult.QuizId));

            return Ok(new { responseTestData});
        }

        [Authorize]
        [Route("api/testing/getTestResult")]
        [HttpPut]
        public ActionResult GetTestResult(RequestTestResultObjectFormat request)
        {
                Student student = _context.Students.Single(s => s.UserId == userId);
                Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
                TestingResults testingResult = _context.TestingResults.Single(r => r.TestingResultId == result.TestingResultId);
                List<Question> questions = _context.Questions.Where(q => q.QuizId == testingResult.QuizId).ToList();
                

                if (questions != null)
                {
                    if (questions.Count == request.answers.Length)
                    {
                        ResponseTestResult[] responseResult = new ResponseTestResult[questions.Count];
                        int count = 0;
                        for (int i = 0; i < request.answers.Length; i++)
                        {
                            Answer pickAnswer = _context.Answers.Single(a => a.AnswerId == request.answers[i].answerId);
                            responseResult[i] = new ResponseTestResult
                            {
                                questionId = request.answers[i].questionId,
                                answerText = pickAnswer.AnswerText,
                                isRight = pickAnswer.isRight
                            };
                            if (pickAnswer.isRight)
                                count++;
                        }

                        double percentRight = (count * 100) / questions.Count;

                    if (percentRight > 80)
                    {
                        testingResult.CountTries += 1;
                        _context.Entry(testingResult).State = EntityState.Modified;

                        result.Section2 = true;                        
                        _context.Entry(result).State = EntityState.Modified;
                        _context.SaveChanges();
                    }

                    return Ok(new { responseResult = responseResult });
                    }
                }

                return Ok(new { responseResult = "error" });                    
        }

        private ResponseTestData GetResponseTestData(Quiz quiz)
        {
            ResponseTestData result = null;
            List<Question> questions = _context.Questions.Where(q => q.QuizId == quiz.QuizId).ToList();

            if (questions != null)
            {
                result = new ResponseTestData
                {
                    quizId = quiz.QuizId,
                    quizName = quiz.QuizName,
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
                            answerText = answer.AnswerText
                        });
                    }

                    result.questions.Add(new ResponseQuestion
                    {
                        questionId = question.QuestionId,
                        questionText = question.QuestionText,
                        answers = responseAnswers
                    });
                }
            }
                    
            return result;
        }

        #endregion
    }

}
