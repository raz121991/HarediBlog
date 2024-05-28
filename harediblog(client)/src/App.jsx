
import { Routes, Route } from 'react-router-dom';
import './App.css'
import BlogContainer from './components/BlogContainer';
import HomePage from './components/HomePage';
import BlogPostDetail from './components/BlogPostDetails';
import AdminNewPost from './components/AdminNewPost';
import AdminPosts from './components/AdminPost';
import AdminEditPost from './components/AdminEditPost';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} 
        />
        <Route path='/posts/:id' element={<BlogPostDetail />}/>
        <Route path="/admin/new" element={<AdminNewPost />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/posts/:id" element={<AdminEditPost />} />
      </Routes>
      
    </div>
  )
}

export default App
