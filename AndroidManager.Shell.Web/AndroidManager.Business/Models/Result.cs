using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace AndroidManager.Business.Models
{
    public class Result
    {
        public readonly bool Succeeded;
        public readonly string Message;

        public Result(bool succeeded, string msg = "")
        {
            Succeeded = succeeded;
            Message = msg;
        }

        public JObject ToJson()
        {
            return new JObject(new JProperty("Succeeded", Succeeded),new JProperty("Message", Message));
        }
    }
}
