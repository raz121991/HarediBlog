import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogPostDetails.css";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [isSenderNameValid, setIsSenderNameValid] = useState(true);
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7012/api/posts/${id}`);
        if(response.ok)
        {
          const data = await response.json();
          setPost(data);
        }
        else
        {
          console.log('Could not fetch post data');
        }
        
      } catch (error) {
        console.error("Could not fetch post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!senderName.trim() || !commentText.trim()) {
      // Update the validation state as needed
      setIsSenderNameValid(senderName.trim() !== "");
      setIsCommentValid(commentText.trim() !== "");
      return;
    }

    const newComment = {
      name: senderName,
      body: commentText,
      postId: id,
    };

    // Submit comment logic goes here...
    const response = await fetch(`https://localhost:7012/api/comments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    const addedComment = await response.json(); // If your backend returns the added comment
    post.comments.unshift(addedComment);
    setPost(oldPost => {
      return {...oldPost,...post}
    });

    setSenderName("");
    setCommentText("");
    setIsSenderNameValid(true);
    setIsCommentValid(true);
  };

  if (!post) return <div>טוען...</div>;

  return (
    <div className="postDetailContainer">
      <div className="postCard">
        <div className="dateContainer">
        <span className="postDate"> {new Date(post.date).toLocaleDateString()} <i class="fas fa-calendar-alt"></i></span> 
        </div>

        <h1 className="postTitle">{post.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>
      </div>
      <div className="addCommentSection">
        <form onSubmit={handleSubmitComment}>
          <div>
            <input
              type="text"
              className={`commentInput ${!isSenderNameValid ? "invalid" : ""}`}
              placeholder="שמך"
              value={senderName}
              onChange={(e) => {
                setSenderName(e.target.value);
                if (!isSenderNameValid) setIsSenderNameValid(true); // Reset validation state as user types
              }}
            />
            {!isSenderNameValid && (
              <div className="commentError">השם לא יכול להיות ריק</div>
            )}
          </div>
          <div>
            <textarea
              className={`commentTextArea ${!isCommentValid ? "invalid" : ""}`}
              placeholder="הוספת תגובה"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                if (!isCommentValid) setIsCommentValid(true);
              }}
            ></textarea>
            {!isCommentValid && (
              <div className="commentError">תגובה לא יכולה להיות ריקה</div>
            )}
          </div>

          <button type="submit" className="submitCommentButton">
            הגב
          </button>
        </form>
      </div>
      {post.comments && post.comments.length > 0 && (
        <div className="commentsSection">
          <h2>תגובות</h2>
          {post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="commentHeader">
                <div className="commentDate">
                  {new Date(comment.date).toLocaleDateString()}
                </div>
                <div className="commentAuthor">{comment.name} </div>
              </div>
              <p className="commentBody">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default BlogPostDetail;
