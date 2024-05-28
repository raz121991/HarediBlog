using Microsoft.Extensions.Hosting;

namespace HarediMatchBlog.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Body { get; set; }
        public DateTime Date { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
