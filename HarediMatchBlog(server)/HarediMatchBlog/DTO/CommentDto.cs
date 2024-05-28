namespace HarediMatchBlog.DTO
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Body { get; set; }
        public int PostId { get; set; }
        public DateTime Date { get; set; }
    }
}
