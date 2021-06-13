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
    public class StatisticController : Controller
    {
        private readonly TritonDbContext _context;
        private readonly IWebHostEnvironment env;

        private int userId => int.Parse(User.Claims.Single(c => c.Type == "userId").Value);

        public StatisticController(TritonDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            this.env = env;
        }

        //[Authorize]
        [Route("api/statistic/getAll")]
        [HttpGet]
        public ActionResult GetStatistic()
        {
            List<Student> students = _context.Students.ToList();

            if (students != null) 
            {
                List<StatisticResponse> statistic = new List<StatisticResponse>(); 

                foreach (Student student in students)
                {
                    User user = _context.Users.Single(u => u.UserId == student.UserId);
                    Result result = _context.Results.Single(r => r.StudentId == student.StudentId);
                    DiagramResults diagramResult = _context.DiagramResults.Single(d => d.DiagramResultId == result.DiagramResultId);
                    Group group = _context.Groups.Single(g => g.GroupId == student.GroupId);

                    string[] diagramSchemes = new string[] { 
                        diagramResult.step1,
                        diagramResult.step2,
                        diagramResult.step3,
                        diagramResult.step4,
                        diagramResult.step5,
                        diagramResult.step6,
                        diagramResult.step7,
                        diagramResult.step8
                    };

                    statistic.Add(new StatisticResponse 
                    { 
                        surname = user.Surname,
                        name = user.Name,
                        patronymic = user.Patronymic,
                        groupName = group.GroupName,
                        sections = new bool[] { result.Section1, result.Section2, result.Section3},
                        diagramResults = diagramSchemes,
                        timeStart = result.TimeStart,
                        timeEnd = result.TimeEnd
                    });
                }

                return Ok(new { statistic });
            }

            return Ok(new { statistic = "null" });
        }

    }
}
