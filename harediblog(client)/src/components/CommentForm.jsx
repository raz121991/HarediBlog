import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    body: '',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name cannot be empty';
    }
    if (!body.trim()) {
      newErrors.body = 'Body cannot be empty';
    }

    setErrors(newErrors);
    // Form is valid if there are no error messages
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const comment = {
      postId, 
      name,
      body
    };
    
    


    const response = await fetch('https://localhost:7012/api/Comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      const responseData = await response.json();
      if(responseData && responseData.date)
      {
        onCommentAdded({ ...comment, id: responseData.id, date: responseData.date });
      }
      setName('');
      setBody('');
      setErrors({
        name: '',
        body: '',
      });
    } else {
      console.error('Failed to post comment');
    }

   
    
  };

  return (
    <form onSubmit={handleSubmit} className="commentForm">
       <div className="mb-3">
        <label htmlFor="name" className="form-label">שם</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
   
      <div className="mb-3">
        <label htmlFor="body" className="form-label">גוף התגובה</label>
        <textarea className="form-control" id="body" rows="3" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        {errors.body && <div className="text-danger">{errors.body}</div>}
      </div>
      <button type="submit" className="btn btn-success">שלח תגובה</button>
    </form>
  );
};

export default CommentForm;