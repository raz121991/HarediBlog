import { React, useState } from "react";
import CommentForm from "./CommentForm";
import "./BlogPost.css";

const BlogPost = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  return (
    <article className="blogPost">
      <div className="postBody">
        <p className="postDate">{new Date(post.date).toLocaleDateString()}</p>
        <h2 className="postTitle">{post.title}</h2>
        <div className="postContent">{post.body}</div>
      </div>
      <button
        aria-label="Reply to post"
        className="replyButton"
        onClick={() => setShowCommentForm(!showCommentForm)}
      >
        <i className="fas fa-reply"></i> הגב
      </button>
      {comments.length > 0 && (
        <div
          className="toggleCommentsLabel"
          onClick={() => setShowComments(!showComments)}
          style={{ cursor: "pointer" }} 
        >
          הצג תגובות
        </div>
      )}
      {showCommentForm && (
        <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
      )}
      {comments && comments.length > 0 && showComments && (
        <div className="commentsSection">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-date">
                {new Date(comment.date).toLocaleDateString()}
              </div>
              <span className="comment-author">{comment.name}</span>
              <div className="comment-body">{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default BlogPost;
