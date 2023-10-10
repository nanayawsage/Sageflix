import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useParams } from "react-router-dom";
import Hero from './Hero';
// import FooterCopy from './FooterCopy';

// import axios from 'axios';

const Homemovies = () => {

  const { id } = useParams();
  const [movies, setMovies] = useState([]);



  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=364477e37eaff7fbb22eaf9619ae7d93&append_to_response=videos'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json(); // Destructure the 'results' array directly
        // console.log(results)
        setMovies(results); // Set 'movies' to the list of movies
      
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }



    fetchMovies();
  }, [id]);

  const renderMovies = () => (
    <>

    <div className='container '>
    <Hero text = "Trending Now" />
       <div className='row'>
      
      {movies.map((movie) => (
        <MovieCard  key={movie.id} movie={movie} />
      ))}
       </div>

    </div>
    </>
  );


  return renderMovies(
    
  )


};

    

export default Homemovies;
