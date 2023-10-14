import React from "react";
import Hero from "./Hero";

const Contact = () => {
  return (
    <>
    <div className="container text-center">
      <Hero text="Send Us A Message" />
      <div className="row justify-content-center">
      <div className="card col-md-6">
        <form
          className="form my-5"
          action="https://formspree.io/f/mwkdbdyy"
          method="POST"
        >
          <div class="mb-3">
            <label for="email" className="form-label">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Enter Your Message
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="message"
              rows="3"
            ></textarea>
            <button className=" my-5 btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      </div>

    
    </div>
  
    </>
  );
};

export default Contact;
