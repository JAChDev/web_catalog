using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogService.Common.Responses
{
    public class ProcessResponse
    {
        public HttpStatusCode Status { get; set; }
        public string description { get; set; }
        public List<object> items { get; set; }

    }
}
