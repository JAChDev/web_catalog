using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogService.Infrastructure.Data.Interface
{
    public interface IStoreProcedureHelper
    {
        IEnumerable<T> ExecuteSp<T, P>(string query, P parameters, string connection);
        IEnumerable<T> ExecuteSp<T>(string query, string connection);
    }
}
