import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutView from "./components/About";
import SearchView from "./components/Search";
import MovieView from "./components/Movies";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import SideMenu from "./components/SideMenu";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homemovies from "./components/Homemovies";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Footer from "./components/Footer";

const firebaseConfig = {
  apiKey: "AIzaSyA5QtrkNWakHpBKHNJ2w-0QAEYWtZUO3JQ",
  authDomain: "sageflix.firebaseapp.com",
  projectId: "sageflix",
  storageBucket: "sageflix.appspot.com",
  messagingSenderId: "652465226445",
  appId: "1:652465226445:web:8e5d693414a23972411f84",
  measurementId: "G-F30X05F63N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Search effect that triggers as you type
  useEffect(() => {
    const searchMovies = async () => {
      if (!searchText || searchText.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchText.trim())}&api_key=364477e37eaff7fbb22eaf9619ae7d93&page=1`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Search results:', data);
        setSearchResults(data.results || []);
        
        // Auto-navigate to search page when user starts typing
        if (searchText.trim() && location.pathname !== '/Search') {
          navigate('/Search');
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    };

    // Debounce search by 300ms to avoid too many API calls while still feeling instant
    const timeoutId = setTimeout(searchMovies, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText, navigate, location.pathname]);

  // Clear search and go back to home when search is cleared
  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    if (location.pathname === '/Search') {
      navigate('/');
    }
  };

  return (
    <div className="dark-page">
      <SideMenu />
      <Navbar 
        searchText={searchText} 
        setSearchText={setSearchText}
        onClearSearch={handleClearSearch}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Movies/:id" element={<MovieView />} />
        <Route path="/Homemovies" element={<Homemovies />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<AboutView />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Search"
          element={
            <SearchView 
              keyword={searchText} 
              searchResults={searchResults}
            />
          }    
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;