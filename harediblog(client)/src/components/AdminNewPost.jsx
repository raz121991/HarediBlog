import React, { useState } from "react";
import "./AdminNewPost.css";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 

const AdminNewPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const modules = {
    toolbar: [
      [{ direction: "rtl" }], // Add RTL to the toolbar
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"], // links and images
      ["clean"], // remove formatting button
    ],
  };

  const formats = [
    "direction",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!imageUrl.trim()) newErrors.imageUrl = "קישור לתמונה לא יכול להיות ריק";
    if (!title.trim()) newErrors.title = "כותרת הפוסט לא יכולה להיות ריקה";
    if (!body.trim()) newErrors.body = "גוף הפוסט לא יכול להיות ריק";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const post = { imageUrl, title, body, comments: [] };
    try {
      const response = await fetch("https://localhost:7012/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        setImageUrl("");
        setTitle("");
        setBody("");
        alert("Post created successfully!");
      } else {
        alert("There was an issue creating the post in the server");
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>יצירת בלוג פוסט חדש</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>קישור לתמונה</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={errors.imageUrl ? "input-error" : ""}
          />
          {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
        </div>

        <div>
          <label>כותרת הפוסט:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div>
          <label>גוף הפוסט:</label>
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
            style={{ height: "250px" }} 
          />

          {errors.body && <div className="error">{errors.body}</div>}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            שלח
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewPost;
