using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AndroidManager.Data.Models
{
    [Table("SkillsToAndroids")]
    public class SkillToAndroidEntity
    {
        [Required]
        [Column("SkillId")]
        public int SkillId { get; set; }

        [Required]
        [Column("AndroidId")]
        public int AndroidId { get; set; }

        [ForeignKey(nameof(SkillId))]
        public SkillEntity Skill { get; set; }

        [ForeignKey(nameof(AndroidId))]
        public AndroidEntity Android { get; set; }
    }
}
