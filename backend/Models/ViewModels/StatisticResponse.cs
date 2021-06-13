using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TritonBackend.Models.ViewModels
{
    public class StatisticResponse
    {
        public string surname { get; set; }
        public string name { get; set; }
        public string patronymic { get; set; }
        public string groupName { get; set; }
        public bool[] sections { get; set; }
        public string[] diagramResults { get; set; }
        public DateTime? timeStart { get; set; }
        public DateTime? timeEnd { get; set; }
    }
}
