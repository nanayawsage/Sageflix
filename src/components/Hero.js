const Hero = ({ text, backdrop }) => {
  return (
    <header className=" textColor container dark-page my-1  p-3 hero-container">
      <h1 className="hero-text">{text}</h1>
      {backdrop && (
        <div
          className="hero-backdrop"
          style= {{ backgroundImage: `url(${backdrop})` }}
        ></div>
      )}
    </header>
  );
};

export default Hero;
