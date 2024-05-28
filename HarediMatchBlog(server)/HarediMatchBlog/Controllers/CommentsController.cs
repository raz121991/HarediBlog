using HarediMatchBlog.Data;
using HarediMatchBlog.DTO;
using HarediMatchBlog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HarediMatchBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Comment>> CreateComment([FromBody] CommentDto commentDto)
        {
            var comment = new Comment
            {
                Name = commentDto.Name,
                Body = commentDto.Body,
                PostId = commentDto.PostId,
                Date = DateTime.Now
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }
    }
}
