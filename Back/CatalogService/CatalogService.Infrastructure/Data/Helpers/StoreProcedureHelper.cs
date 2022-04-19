using CatalogService.Infrastructure.Data.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace CatalogService.Infrastructure.Data.Helpers
{
    public class StoreProcedureHelper : IStoreProcedureHelper
    {
        public IEnumerable<T> ExecuteSp<T, P>(string query, P parameters, string connection)
        {
            IEnumerable<T> result;
            using (SqlConnection cnx = new SqlConnection(connection))
            {
                result = cnx.Query<T>(query, parameters, commandType: CommandType.StoredProcedure, commandTimeout: 9000);
            }
            return result;
        }

        public IEnumerable<T> ExecuteSp<T>(string query, string connection)
        {
            IEnumerable<T> result;
            using (SqlConnection cnx = new SqlConnection(connection))
            {
                result = cnx.Query<T>(query, commandType: CommandType.StoredProcedure);
            }
            return result;
        }
    }
}
