import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './components/Pages/Home.jsx'
import Post from './components/Post/Post.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import ProtectedRoute from './components/Admin/ProtectedRoute.jsx';
import PostList from './components/Admin/PostList.jsx';
import PostForm from './components/Admin/PostForm.jsx';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post/>} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<PostList />} />
            <Route path="new" element={<PostForm />} />
            <Route path="edit/:postId" element={<PostForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
