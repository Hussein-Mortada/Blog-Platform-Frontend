import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GuestGuard from './context/GuestGuard';
import { AuthProvider } from './context/AuthContext';
import IndustryPage from './pages/IndustryPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
import ProfileGuard from './context/ProfileGuard';
import EditBlogPage from './pages/EditBlogPage';
import AddBlogPage from './pages/AddBlogPage';
function App() {
  return (
    <div className='app-container'>
    <Router>
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industry/:industryId" element={<IndustryPage/>} />
          <Route path="/blog/:blogId" element={<BlogPage/>} />
          <Route path="/login" element={<GuestGuard><LoginPage /></GuestGuard>} />
          <Route path="/register" element={<GuestGuard><RegisterPage /></GuestGuard>} />
          <Route path="/user/:userId" element={<UserPage/>} />
          <Route path="/profile" element={<ProfileGuard><ProfilePage/></ProfileGuard>} />
          <Route path="/blog/edit/:blogId" element={<EditBlogPage/>} />
          <Route path="/blog/add" element={<AddBlogPage/>} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
    
    </div>
  );
}

export default App;

// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';
// import About from './pages/About';
// import MovieDetailsPage from './pages/MovieDetailsPage';
// import SearchPage from './pages/SearchPage';
// 
// 
// 
// 
// 
// 
// 
// 