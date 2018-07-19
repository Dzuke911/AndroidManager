using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AndroidManager.Data.Models
{
    [Table("Jobs")]
    public class JobEntity
    {
        [Column("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("Name")]
        public string Name { get; set; }

        [Column("Description")]
        public string Description { get; set; }

        [Column("Complexity")]
        public int Complexity { get; set; }

        [ForeignKey("JobId")]
        public ICollection<AndroidEntity> Androids { get; set; }
    }
}
