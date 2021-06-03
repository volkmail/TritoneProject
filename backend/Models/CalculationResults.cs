using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class CalculationResults
    {
        [Key]
        public int CalculationResultId { get; set; }
        public string? CalculationResult { get; set; }
        public Result Result { get; set; }
    }
}
