using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace HarediMatchBlog.Models
{
    public class PatchRequest
    {
        public JsonPatchDocument<Post> patchDoc { get; set; }
    }
}
