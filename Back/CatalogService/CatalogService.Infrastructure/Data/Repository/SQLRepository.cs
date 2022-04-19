using CatalogService.Domain.CatalogItem;
using CatalogService.Infrastructure.Data.Interface;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogService.Infrastructure.Data.Repository
{
    public class SQLRepository : IDbFunctionsRepository
    {
        private readonly string _infoDataBase;
        private readonly IStoreProcedureHelper _spHelper;

        public SQLRepository(IConfiguration configuration,
                             IStoreProcedureHelper spHelper)
        {
            _infoDataBase = configuration.GetConnectionString("InfoDataBase");
            _spHelper = spHelper;
        }

        public void AddItem(string Name, string Description, string Type, string ImagePath)
        {
            IEnumerable<string> result = _spHelper.ExecuteSp<string, object>("SP_AddProducts", new { Name = Name, Description = Description, Type = Type, ImagePath = ImagePath}, _infoDataBase);
        }

        public void UpdateItem(int Id, string Name, string Description, string Type, string ImagePath)
        {
            IEnumerable<string> result = _spHelper.ExecuteSp<string, object>("SP_UpdateProduct", new {Id = Id, Name = Name, Description = Description, Type = Type, ImagePath = ImagePath }, _infoDataBase);
        }

        public void DeleteItem(int Id, string Name)
        {
            IEnumerable<string> result = _spHelper.ExecuteSp<string, object>("SP_DeleteProducts", new { Id = Id, Name = Name }, _infoDataBase);
        }

        public List<CatalogItemGet> GetAllItems()
        {
            List<CatalogItemGet> result = _spHelper.ExecuteSp<CatalogItemGet, object>("SP_GetProducts", null, _infoDataBase).ToList();
            return result;
        }

        public List<CatalogItemGet> GetItemsByFilter(string TypeStr, string NameStr, string DescriptionStr)
        {
            List<CatalogItemGet> result = _spHelper.ExecuteSp<CatalogItemGet, object>("SP_GetProductsFilter", new { Type = TypeStr, Name = NameStr, Description = DescriptionStr }, _infoDataBase).ToList();
            return result;
        }
    }
}
