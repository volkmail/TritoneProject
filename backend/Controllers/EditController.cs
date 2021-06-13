using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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
        
    }
}
