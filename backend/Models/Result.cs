using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TritonBackend.Models
{
    public class Result
    {
        [Key]
        public int ResultId { get; set; }        
        public bool Section1 { get; set; }
        public bool Section2 { get; set; }
        public bool Section3 { get; set; }
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }

        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }

        [ForeignKey("DiagramResults")]
        public int DiagramResultId { get; set; }
        public DiagramResults DiagramResults { get; set; }

        [ForeignKey("CalculationResults")]
        public int CalculationResultId { get; set; }
        public CalculationResults CalculationResults { get; set; }

        [ForeignKey("TestingResults")]
        public int TestingResultId { get; set; }
        public TestingResults TestingResults { get; set; }
    }
}
