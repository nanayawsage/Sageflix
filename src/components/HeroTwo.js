import YouTube from "react-youtube";

const HeroTwo = ({ text, backdrop }) => {
  return (
    <header className=" textColor bg-dark col-lg-4 col-md-3  my-4 p-5 constrain">
      <h1 className="hero-text">{text}</h1>
      <button className="btn btn-danger my-5">Play Trailer</button>
      <YouTube/>
      {backdrop && (
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
        ></div>
      )}
    </header>
  );
};

export default HeroTwo;
