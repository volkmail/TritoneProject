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

namespace TritonBackend.Controllers
{
    [ApiController]
    public class DiagramElementsController : ControllerBase
    {
        private readonly TritonDbContext context;
        private readonly IWebHostEnvironment env;

        //private int userId => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);

        public DiagramElementsController(TritonDbContext context, IWebHostEnvironment env)
        {
            this.context = context;
            this.env = env;
        }

        //[Authorize]
        [Route("api/GetDiagramElements")]
        [HttpGet]
        public async Task<ActionResult> GetDiagramElements()
        {
            List<DiagramElement> diagramElements = await context.DiagramElements.Select(de => new DiagramElement()
            {
                ElementId = de.ElementId,
                ElementName = de.ElementName,
                ElementImageSrc = string.Format("{0}://{1}{2}/{3}",
                    Request.Scheme,
                    Request.Host,
                    Request.PathBase,
                    de.ElementImageSrc.Replace(@"\", @"/"))
            }).ToListAsync();

            return Ok(new { data = diagramElements, ResultCode = 0 });
        }
    }

}
