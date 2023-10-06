// import Hero from "./Hero";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "./Footer";

// // https://api.themoviedb.org/3/movie/343611?api_key=364477e37eaff7fbb22eaf9619ae7d93

// const MovieSearch = () => {
//   const { id } = useParams();
//   const [movieSearch, setMovieSearch] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=364477e37eaff7fbb22eaf9619ae7d93`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setMovieSearch(data);
//         setIsLoading(false);
//       });
//   }, [id]);

//   function renderMovieSearch() {
//     if (isLoading) {
//       return <Hero text="Search Results" />;
//     }
//     if (movieSearch) {
//       return (
//         <>
//           <Hero text="Loading, Please wait a sec..."/>

//           <div>
//           <h2>{movieSearch.original_title}</h2>
//           </div>
         
            
          
            





//           <Footer />
//         </>
//       );
//     }
//   }

//   return renderMovieSearch();
// };

// export default MovieSearch;