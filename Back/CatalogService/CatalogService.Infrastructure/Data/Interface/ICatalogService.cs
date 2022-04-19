using CatalogService.Common.Responses;
using CatalogService.Domain.CatalogItem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogService.Infrastructure.Data.Interface
{
    public interface ICatalogService
    {
        ProcessResponse GetItems();
        ProcessResponse GetItemsByFilter(string Type, string Name, string Description);
        ProcessResponse AddItems(CatalogItem catalogItem);
        ProcessResponse UpdateItems(CatalogItemGet catalogItemGet);
        ProcessResponse DeleteItems(int Id, string Name);
    }
}
