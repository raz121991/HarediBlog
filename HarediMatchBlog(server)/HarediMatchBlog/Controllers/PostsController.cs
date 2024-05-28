using HarediMatchBlog.Data;
using HarediMatchBlog.DTO;
using HarediMatchBlog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace HarediMatchBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            if(_context.Posts.Any())
            {

                var posts = await _context.Posts.Include(a => a.Comments).Select(p => new PostDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Body = p.Body,
                    Date = p.Date,
                    ImageUrl = p.ImageUrl,
                    Comments = p.Comments.Select(c => new CommentDto
                    {  Id = c.Id,
                        Name = c.Name,
                        Body = c.Body,
                        PostId = c.PostId,
                        Date = c.Date
                    }).ToList()
                }).OrderByDescending(p => p.Date).ToListAsync();

                return Ok(posts);
            }
            return Ok(new List<Post>());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetPost(int id)
        {
            if (_context.Posts.Any())
            {

                var post = await _context.Posts.Include(c => c.Comments).FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                {
                    return BadRequest("Post is not found");
                }
                var postDto = new PostDto()
                {
                    Id = post.Id,
                    Title = post.Title,
                    Body = post.Body,
                    Date = post.Date,
                    ImageUrl = post.ImageUrl,
                    Comments = post.Comments.Select(c => new CommentDto { Id = c.Id, Name = c.Name, Body = c.Body, PostId = c.PostId, Date = c.Date }).OrderByDescending(c => c.Date).ToList()
                };
                return Ok(postDto);
            }
            return BadRequest("Somthing went wrogne with the request");
        }



        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost([FromBody] PostDto postDto)
        {
           
            var post = new Post
            {
                Title = postDto.Title,
                Body = postDto.Body,
                Date = DateTime.Now,
                ImageUrl = postDto.ImageUrl,
              Comments = new List<Comment>()
            };

            try
            {

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
                return Ok(post);
            }
            catch(Exception e)
            {
                return BadRequest("error creating post: " + e.Message);
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> Delete(int id)
        {

           

            try
            {
                var postToDelete = await _context.Posts.Include(c => c.Comments).FirstOrDefaultAsync(p => p.Id == id);
                if(postToDelete == null)
                {
                    return BadRequest("Post does not exist");
                }

                 _context.Posts.Remove(postToDelete);

                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("error deleting post: " + e.Message);
            }

        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> PartiallyUpdatePost(int id, [FromBody] PatchRequest request)
        {
            // Assume we fetch the existing post first
            var post = await _context.Posts.Include(c => c.Comments).FirstOrDefaultAsync(p => p.Id == id);
            if (post == null)
            {
                return NotFound();
            }
            if (request == null || request.patchDoc == null)
            {
                return BadRequest("Invalid patch document");
            }
           
            request.patchDoc.ApplyTo(post, ModelState);



            _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
