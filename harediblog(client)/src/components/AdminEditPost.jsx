import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "./AdminEditPost.css";

const AdminEditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    imageUrl: "",
    body: "",
  });

  const [initialPost, setInitialPost] = useState(null);
  const [isEditorReady,setIsEditorReady] = useState(false);

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

  const navigate = useNavigate();
  const forceUpdate = () => setRefresh(prev => !prev);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://localhost:7012/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPost(prevPost => ({ ...prevPost, ...data })); 
        setInitialPost(prevPost => ({ ...prevPost, ...data }));
        setIsEditorReady(true);
      } else {
        console.error("Failed to fetch post details");
      }
    };
    fetchPost();
   
  }, [id]);

  const handleSave = async () => {
    let patchPost = {};
    patchPost.patchDoc = [];
    let currentIndex = 0;
    if (initialPost.title != post.title) {
      patchPost.patchDoc[currentIndex] = {
        op: "replace",
        path: "/title",
        value: post.title,
      };
      currentIndex++;
    }

    if (initialPost.body != post.body) {
      patchPost.patchDoc[currentIndex] = {
        op: "replace",
        path: "/body",
        value: post.body,
      };
      currentIndex++;
    }

    if (initialPost.imageUrl != post.imageUrl) {
      patchPost.patchDoc[currentIndex] = {
        op: "replace",
        path: "/imageUrl",
        value: post.imageUrl,
      };
      currentIndex++;
    }

    // PATCH request to update the post
    try {
      const response = await fetch(`https://localhost:7012/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchPost),
      });

      if (response.ok) {
        alert("Post updated successfully");
        navigate("/admin/posts");
      } else {
        const errorData = await response.json();
        alert("Failed to update post: " + errorData.message);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Failed to update post");
    }
  };

  const handleDelete = async () => {
    // Confirm delete action
    if (window.confirm("אתה בטוח שאתה רוצה למחוק את הפוסט הזה?")) {
      const response = await fetch(`https://localhost:7012/api/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Post deleted successfully");
        navigate("/admin/posts");
      }
    }
  };

  function setBody(value){
    setPost({ ...post, body: value});
  }
  
  return (
    <div>
      <h1>עריכת פוסט</h1>
      <div>
        <label>כותרת הפוסט:</label>
        <input
          type="text"
          value={post.title || ""}
          onChange={(e) => setPost(prevPost => ({ ...prevPost, title: e.target.value }))}
        />
      </div>
      <div>
        <label>קישור לתמונה</label>
        <input
          type="text"
          value={post.imageUrl }
          onChange={(e) => setPost(prevPost => ({ ...prevPost, imageUrl: e.target.value }))}
        />

      </div>
      <div>
        <label>גוף הפוסט:</label>
        { isEditorReady && <ReactQuill
          theme="snow"
          value={post.body || ""}
          onChange={setBody}
          modules={modules}
          formats={formats}
          style={{ height: "250px" }} 
        /> }
      </div>
      <div className="actions">
        <button className="btn btn-danger" onClick={handleDelete}>
          מחק
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          שמור
        </button>
      </div>
    </div>
  );
};

export default AdminEditPost;
