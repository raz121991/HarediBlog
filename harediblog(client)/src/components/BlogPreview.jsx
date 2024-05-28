import { Link } from "react-router-dom";
import "./BlogPreview.css";
const BlogPreview = ({ post }) => {
  return (
    <div className="blogPreviewCard">
      <Link to={`/posts/${post.id}`} className="blogPreview">
        <div className="previewDate">
          {new Date(post.date).toLocaleDateString("he-IL")}
        </div>
        <img className="previewImage" src={post.imageUrl} alt="Post" />
        <h3 className="previewTitle">{post.title}</h3>
        <hr className="previewSeparator" />
        <div className="previewComments">
          <i className="commentsIcon fas fa-comments"></i>
          <span className="commentsCount">{post.comments.length}</span>
        </div>
      </Link>
    </div>
  );
};

export default BlogPreview;
