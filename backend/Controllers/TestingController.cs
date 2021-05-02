using System;
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

        [Authorize]
        [Route("api/testing/getDiagramElements")]
        [HttpGet]
        public async Task<ActionResult> GetDiagramElements()
        {
            List<DiagramElement> diagramElements = await _context.DiagramElements.Select(de => new DiagramElement()
            {
                ElementId = de.ElementId,
                ElementName = de.ElementName,
                ElementImageSrc = string.Format("{0}://{1}{2}/{3}",
                    Request.Scheme,
                    Request.Host,
                    Request.PathBase,
                    de.ElementImageSrc.Replace(@"\", @"/")),
                ElementText = de.ElementText ?? ""
            }).ToListAsync();

            return Ok(new { data = diagramElements, ResultCode = 0 });
        }

        [Authorize]
        [HttpGet]
        [Route("api/testing/getCurrentDiagramStep")]
        public ActionResult GetCurrentDiagramStep()
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            DiagramResults diagramResults = _context.DiagramResults.Single(dr => dr.ResultId == student.ResultId);

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
            }

            return Ok(new { currentStep});
        }

        [Authorize]
        [HttpPut]
        [Route("api/testing/setCurrentDiagramStep")]
        public ActionResult SetCurrentDiagramStep(string stepResult, int stepNumber)
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            DiagramResults diagramResults = _context.DiagramResults.Single(dr => dr.ResultId == student.ResultId);

            switch (stepNumber)
            {
                case 1:
                    {
                        diagramResults.step1 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 2:
                    {
                        diagramResults.step2 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 3:
                    {
                        diagramResults.step3 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 4:
                    {
                        diagramResults.step4 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 5:
                    {
                        diagramResults.step5 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 6:
                    {
                        diagramResults.step6 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 7:
                    {
                        diagramResults.step7 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
                case 8:
                    {
                        diagramResults.step8 = stepResult;
                        _context.Entry(diagramResults).State = EntityState.Modified;
                        break;
                    }
            }

            stepNumber = (stepNumber + 1) == 9 ? 0 : stepNumber++;

            

            return Ok(new { stepNumber });
        }

        [Authorize]
        [HttpGet]
        [Route("api/testing/getCheckPoints")]
        public ActionResult GetUserTestingInfo() 
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.ResultId == student.ResultId);

            List<CheckPoint> checkPoints = _context.CheckPoints.Where(cp => cp.ResultId == student.ResultId).ToList();

            List<CheckPoint> window1Cps = checkPoints?.Where(cp => Regex.IsMatch(cp.CpName, @"^window1_cp(\d?)")).ToList();

            //TODO: Здесь будут еще другие контрольные точки
            return Ok(new { sections = new bool[3] { result.Section1, result.Section2, result.Section3 },
                checkPoints = new { window1Cps } });
        }

        [Authorize]
        [Route("api/testing/setSectionComplete")]
        [HttpPut]
        public ActionResult SetSectionComplete(int sectionNumber)
        {
            Student student = _context.Students.Single(s => s.UserId == userId);
            Result result = _context.Results.Single(r => r.ResultId == student.ResultId);

            switch (sectionNumber)
            {
                case 1:
                    {
                        result.Section1 = true;
                        _context.Entry(result).State = EntityState.Modified;
                        break;
                    }
                case 2:
                    {
                        result.Section2 = true;
                        _context.Entry(result).State = EntityState.Modified;
                        break;
                    }
                case 3:
                    {
                        result.Section3 = true;
                        _context.Entry(result).State = EntityState.Modified;
                        break;
                    }
            }

            _context.SaveChanges();

            return Ok(new { });
        }


    }

}
