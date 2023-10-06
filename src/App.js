


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

import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Homemovies from "./components/Homemovies";



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

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
export const db = getFirestore(app); // Initialize Firestore and export it


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

 



  useEffect(() => {
    if (searchText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=364477e37eaff7fbb22eaf9619ae7d93`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data.results);
        });
    }
  }, [searchText]);

  return (

   
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText} />

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
            <SearchView keyword={searchText} searchResults={searchResults} />
          }
          
        />
        
      </Routes>

    </div>
  );
}

export default App;
