using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TritonBackend.Models.ViewModels
{
    public class EditGroupRequest
    {
        public int groupId { get; set; }
        public string groupName { get; set; }
    }
}
