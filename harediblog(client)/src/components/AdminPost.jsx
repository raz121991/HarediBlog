import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://localhost:7012/api/posts');
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>ניהול פוסטים</h1>
            <ul style={{listStyleType:"none"}}>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/admin/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPosts;