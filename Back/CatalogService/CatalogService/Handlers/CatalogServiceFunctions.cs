using AutoMapper;
using CatalogService.Common.Responses;
using CatalogService.Domain.CatalogItem;
using CatalogService.Infrastructure.Data.Interface;
using CatalogService.Infrastructure.Data.Repository;
using Newtonsoft.Json;
using System.Net;

namespace CatalogService.WebApi.Handlers
{
    public class CatalogServiceFunctions : ICatalogService
    {
        private SQLRepository _sqlRepository;

        public CatalogServiceFunctions(SQLRepository sqlRepository)
        {
            _sqlRepository = sqlRepository;
        }

        

        public ProcessResponse AddItems(CatalogItem catalogItem)
        {
            ProcessResponse processResponse = new ProcessResponse();
            try
            {
                _sqlRepository.AddItem(catalogItem.Name, catalogItem.Description, catalogItem.Type, catalogItem.ImagePath);
                processResponse = new ProcessResponse
                {
                    Status = HttpStatusCode.OK,
                    description = "Item added successfully"
                };
                return processResponse;
            }
            catch
            {
                return new ProcessResponse
                {
                    Status = HttpStatusCode.BadRequest,
                    description = "Error with SP execution"
                };
            }

        }

        public ProcessResponse UpdateItems(CatalogItemGet catalogItem)
        {
            ProcessResponse processResponse = new ProcessResponse();
            try
            {
                _sqlRepository.UpdateItem(catalogItem.Id, catalogItem.Name, catalogItem.Description, catalogItem.Type, catalogItem.ImagePath);
                processResponse = new ProcessResponse
                {
                    Status = HttpStatusCode.OK,
                    description = "Item updated successfully"
                };
                return processResponse;
            }
            catch
            {
                return new ProcessResponse
                {
                    Status = HttpStatusCode.BadRequest,
                    description = "Error with SP execution"
                };
            }

        }

        public ProcessResponse DeleteItems(int Id, string Name)
        {
            ProcessResponse processResponse = new ProcessResponse();
            try
            {
                _sqlRepository.DeleteItem(Id, Name);
                processResponse = new ProcessResponse
                {
                    Status = HttpStatusCode.OK,
                    description = "Item deleted successfully"
                };
                return processResponse;
            }
            catch
            {
                return new ProcessResponse
                {
                    Status = HttpStatusCode.BadRequest,
                    description = "Error with SP execution"
                };
            }
        }

        public ProcessResponse GetItems()
        {
            ProcessResponse processResponse = new ProcessResponse();
            try
            {
                List<CatalogItemGet> catalogItem = _sqlRepository.GetAllItems();
                //string jsonCatalog = JsonSerializer.Serialize(catalogItem);
                List<object> items = new List<object>();

                foreach (CatalogItemGet c in catalogItem)
                {
                    var item = new
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        Type = c.Type,
                        ImagePath = c.ImagePath
                    };
                    items.Add(item);
                }

                processResponse = new ProcessResponse
                {
                    Status = HttpStatusCode.OK,
                    description = "Items listed successfully",
                    items = items
                };
                return processResponse;
            }
            catch
            {
                return new ProcessResponse
                {
                    Status = HttpStatusCode.BadRequest,
                    description = "Error with SP execution"
                };
            }
        }

        public ProcessResponse GetItemsByFilter(string Type, string Name, string Description)
        {
            ProcessResponse processResponse = new ProcessResponse();
            try
            {
                List<CatalogItemGet> catalogItem = _sqlRepository.GetItemsByFilter(Type, Name, Description); 
                //string jsonCatalog = JsonConvert.SerializeObject(catalogItem);

                List<object> items = new List<object>();

                foreach(CatalogItemGet c in catalogItem)
                {
                    var item = new
                    {
                        I = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        Type = c.Type,
                        ImagePath = c.ImagePath
                    };
                    items.Add(item);
                }

                processResponse = new ProcessResponse
                {
                    Status = HttpStatusCode.OK,
                    description = "Items listed successfully",
                    items = items
                };
                return processResponse;
            }
            catch
            {
                return new ProcessResponse
                {
                    Status = HttpStatusCode.BadRequest,
                    description = "Error with SP execution"
                };
            }
        }
    }
}
