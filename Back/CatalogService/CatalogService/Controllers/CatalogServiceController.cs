using AutoMapper;
using CatalogService.Common.Responses;
using CatalogService.Domain.CatalogItem;
using CatalogService.Infrastructure.Data.Interface;
using CatalogService.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CatalogService.WebApi.Controllers
{
    [ApiController]
    [Route("api/catalog")]
    public class CatalogServiceController : ControllerBase
    {
        private readonly ICatalogService _catalogService;

        public CatalogServiceController(
            ICatalogService catalogService
            )
        {
            _catalogService = catalogService;
        }
        [Route("getItems")]
        [HttpGet]

        public IActionResult GetAllItems() 
        {
            ProcessResponse response = _catalogService.GetItems();
            if (response.Status == HttpStatusCode.OK)
            {
                return Ok(response);
            }
            else if (response.Status == HttpStatusCode.BadRequest)
            {
                return BadRequest(response);
            }
            return BadRequest(response);
        }

        [Route("getItemsByFilter/{type}&{name}&{description}")]
        [HttpGet]
        public IActionResult GetItemsByFilter(string type, string name, string description) 
        {
            ProcessResponse response = _catalogService.GetItemsByFilter(type, name, description);
            if (response.Status == HttpStatusCode.OK)
            {
                return Ok(response);
            }
            else if (response.Status == HttpStatusCode.BadRequest)
            {
                return BadRequest(response);
            }
            return BadRequest(response);
        }

        [Route("addItems")]
        [HttpPost]
        public IActionResult AddItems([FromBody] ItemAdd itemAdd)
        {
            // Automapper configuration
            var config = new MapperConfiguration(cfg =>
                cfg.CreateMap<ItemAdd, CatalogItem>());

            var mapper = new Mapper(config);
            var dataMapper = mapper.Map<CatalogItem>(itemAdd);

            //Add item process
            ProcessResponse response = _catalogService.AddItems(dataMapper);
            if (response.Status == HttpStatusCode.OK)
            {
                return Ok(response);
            }
            else if (response.Status == HttpStatusCode.BadRequest)
            {
                return BadRequest(response);
            }
            return BadRequest(response);
        }

        [Route("updateItems")]
        [HttpPut]
        public IActionResult UpdateItems([FromBody] ItemUpdate itemUpdate)
        {
            // Automapper configuration
            var config = new MapperConfiguration(cfg =>
                cfg.CreateMap<ItemUpdate, CatalogItemGet>());

            var mapper = new Mapper(config);
            var dataMapper = mapper.Map<CatalogItemGet>(itemUpdate);

            //Add item process
            ProcessResponse response = _catalogService.UpdateItems(dataMapper);
            if (response.Status == HttpStatusCode.OK)
            {
                return Ok(response);
            }
            else if (response.Status == HttpStatusCode.BadRequest)
            {
                return BadRequest(response);
            }
            return BadRequest(response);
        }

        [Route("deleteItems/{id}&{name}")]
        [HttpDelete]
        public IActionResult DeleteItem(int id, string name)
        {
            ProcessResponse response = _catalogService.DeleteItems(id, name);
            if (response.Status == HttpStatusCode.OK)
            {
                return Ok(response);
            }
            else if (response.Status == HttpStatusCode.BadRequest)
            {
                return BadRequest(response);
            }
            return BadRequest(response);
        }

    }
}
