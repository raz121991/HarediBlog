using HarediMatchBlog.Models;

namespace HarediMatchBlog.DTO
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime Date { get; set; }
        public string ImageUrl { get; set; }
        public List<CommentDto>  Comments { get; set; }
    }
}
