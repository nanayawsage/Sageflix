import Hero from "./Hero";
import backgroundImage from "./backgroundImage.jpg"
import Cards from "./Cards";
// import {Link } from "react-router-dom";
import Footer from "./Footer";
 
const Home = () => {
  return (
    <main className=" container">
      
      <Hero text = "Welcome to SageFlix"/>
      <header  style={{ backgroundImage: `url(${backgroundImage})` }}>

        <div className="color-overlay ">
            <h1 className="home-text  justify-content-center align-item-center">
            Kindly sign In with a valid email and password to enjoy our world
              of movies.
            </h1>
        
           
          </div>
    
      </header>

      <Cards />

      <Footer />
    </main>
  );
};

export default Home;
