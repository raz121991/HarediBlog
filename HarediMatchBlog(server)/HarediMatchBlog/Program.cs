using HarediMatchBlog.Data;
using Microsoft.EntityFrameworkCore;
using System.Configuration;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string? connectionString = builder.Configuration.GetSection("ConnectionStrings")["BlogDbContext"];
builder.Services.AddDbContext<AppDbContext>(options =>
   options.UseSqlServer(connectionString));


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigin",
                      builder =>
                      {
                          builder.WithOrigins("http://127.0.0.1:5173")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();  

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowSpecificOrigin");

app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapControllers(); 
});

app.Run();
