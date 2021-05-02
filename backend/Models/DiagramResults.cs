using System.ComponentModel.DataAnnotations;

namespace TritonBackend.Models
{
    public class DiagramResults
    { 
        [Key]
        public int DiagramResultId { get; set; }
    	public int ResultId { get; set; }
        public Result result { get; set; }

        [MaxLength(1000)]
        public string? step1 { get; set; }
        [MaxLength(1000)]
        public string? step2 {get; set; }
        [MaxLength(1000)]
        public string? step3 {get; set; }
        [MaxLength(1000)]
        public string? step4 {get; set; }
        [MaxLength(1000)]
        public string? step5 {get; set; }
        [MaxLength(1000)]
        public string? step6 {get; set; }
        [MaxLength(1000)]
        public string? step7 {get; set; }
        [MaxLength(1000)]
        public string? step8 {get; set; }

        
    }
}
