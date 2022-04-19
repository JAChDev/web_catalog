namespace CatalogService.WebApi.Models
{
    public class ItemUpdate
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string type { get; set; }
        public string imagePath { get; set; }
    }
}
