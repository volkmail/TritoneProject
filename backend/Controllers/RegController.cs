﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TritonBackend.Models;
using TritonBackend.Models.ViewModels;

namespace TritonBackend.Controllers
{
    [ApiController]
    public class RegController : ControllerBase
    {
        private TritonDbContext _context;
        public RegController(TritonDbContext context)
        {
            _context = context;
        }

        [Route("api/reg/regStudent")]
        [HttpPost]
        public IActionResult RegStudent([FromBody] RegRequestStudent request = null)
        {
            if (request != null)
            {
                _context.Users.Add(new User
                {
                    Login = request.Login,
                    Password = request.Password,
                    Name = request.Name,
                    Surname = request.Surname,
                    Patronymic = request.Patronymic,
                    Role = _context.Roles.Single(r => r.RoleId == 3)
                });

                _context.Results.Add(new Result
                {
                    CalculationResults = new CalculationResults() { },
                    DiagramResults = new DiagramResults() { },
                    Section1 = false,
                    Section2 = false,
                    Section3 = false
                });

                _context.SaveChanges();

                int UserLastRecordId = _context.Users.Max(u => u.UserId);
                int ResultLastRecordId = _context.Results.Max(r => r.ResultId);

                _context.Students.Add(new Student
                {
                    Result = _context.Results.Single(r => r.ResultId == ResultLastRecordId),
                    Group = _context.Groups.Single(g => g.GroupName == request.GroupName),
                    User = _context.Users.Single(u => u.UserId == UserLastRecordId)
                });

                _context.SaveChanges();

                return Ok(new { isReg = "0" });
            }

            return Problem(detail: "Тело запроса пустое");
        }

        [Route("api/reg/validLogin")]
        [HttpPost]
        public IActionResult ValidUserLogin([FromBody] ValidRequest request)
        {
            if (!_context.Users.Any(u => u.Login == request.Login))
                return Ok(new { message = "0" });
            else
                return Ok(new { message = "Пользователь с таким логином уже существует" });
        }

        [Route("api/reg/getGroups")]
        [HttpGet]
        public IActionResult GetGroups()
        {
            List<Group> groups = _context.Groups.Select(g => new Group
            {
                GroupId = g.GroupId,
                GroupName = g.GroupName
            }).ToList();
            return Ok(new { groups = groups });
        }
    }
}
