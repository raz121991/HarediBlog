using HarediMatchBlog.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace HarediMatchBlog.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}
