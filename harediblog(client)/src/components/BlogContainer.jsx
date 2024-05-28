import React, { useState, useEffect } from "react";
import BlogPreview from './BlogPreview';
import  './BlogContainer.css';

const BlogContainer = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://localhost:7012/api/posts");
        if (!response.ok) {
            setError("יש בעיה להגיע לשרת");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Could not fetch posts: ", error);
        setError("יש בעיה להגיע לשרת");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="container my-5">
          <p className="blogDescription">מידע על הבלוג</p>
          {posts.map((post) => (
            <BlogPreview key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogContainer;
