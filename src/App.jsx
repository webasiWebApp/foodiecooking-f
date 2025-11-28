import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './components/Pages/Home.jsx'
import About from './components/Pages/About.jsx'
import Category from './components/Pages/Category.jsx'
import Contact from './components/Pages/Contact.jsx'
import TermsConditions from './components/Pages/TermsConditions.jsx'
import PrivacyPolicy from './components/Pages/PrivacyPolicy.jsx'
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
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<Category />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
