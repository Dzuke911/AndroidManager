using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AndroidManager.Data.Models
{
    [Table("Androids")]
    public class AndroidEntity
    {
        [Column("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("Name")]
        public string Name { get; set; }

        [Column("Avatar")]
        public byte[] Avatar { get; set; }

        [Required]
        [Column("Reliability")]
        public int Reliability { get; set; }

        [Required]
        [Column("Status")]
        public bool Status { get; set; }

        [Required]
        [Column("JobId")]
        public int JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public JobEntity Job { get; set; }

        [ForeignKey("AndroidId")]
        public ICollection<SkillToAndroidEntity> SkillsToAndroids { get; set; }
    }
}
