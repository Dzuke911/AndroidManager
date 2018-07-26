using AndroidManager.Business.Enums;
using AndroidManager.Business.Models;
using AndroidManager.Data.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AndroidManager.Business.Interfaces
{
    public interface IAndroidsManager
    {
        Task<IEnumerable<JObject>> GetAndroids();
        Task<Result> TryCreate(Android android);
        Task<Result> TryDelete(int id);
        Task<Result> TryUpdate(int id, Android job);
    }
}
