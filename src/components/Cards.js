import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
  
  <div className='container caro my-5'>

  <h1>Featured Today</h1>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval = {2000}>
        <img 
         data-bs-theme="dark" 
        className=" d-block w-100"
        src= "https://cdn.pixabay.com/photo/2016/03/07/00/00/cinema-1241422_640.jpg"
        alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval = {2000}>
        <img 
         data-bs-theme="dark" 
          className=" d-block w-100"
          src= "https://cdn.pixabay.com/photo/2015/10/18/21/23/bollywood-posters-995224_640.jpg "
         alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    
    </Carousel>
    </div>
  );
}

export default ControlledCarousel;