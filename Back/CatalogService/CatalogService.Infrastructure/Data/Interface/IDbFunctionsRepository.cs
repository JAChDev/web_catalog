using CatalogService.Domain.CatalogItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogService.Infrastructure.Data.Interface
{
    public interface IDbFunctionsRepository
    {
        List<CatalogItemGet> GetItemsByFilter(string Type,string Name, string Description);
        List<CatalogItemGet> GetAllItems();
        void AddItem(string Name, string Description, string Type, string ImagePath);
        void UpdateItem(int Id, string Name, string Description, string Type, string ImagePath);
        void DeleteItem(int Id, string Name);
    }
}
