using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AndroidManager.Data.Models
{
    [Table("Skills")]
    public class SkillEntity
    {
        [Column("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("Name")]
        public string Name { get; set; }

        [ForeignKey("SkillId")]
        public ICollection<SkillToAndroidEntity> SkillsToAndroids { get; set; }
    }
}
