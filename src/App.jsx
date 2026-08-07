import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import SignIn from './pages/signin.jsx';
import SignUp from './pages/signup.jsx';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import Header from './components/header.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}