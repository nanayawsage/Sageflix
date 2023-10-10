import React from "react";
import Hero from "./Hero";

const Contact = () => {
  return (
    <div className="container">
      <Hero text="Send Us A Message" />
      <form
       className="form my-5 container"
      action="https://formspree.io/f/mwkdbdyy"
      method="POST"
      >

     
      <div class="mb-3">
        <label for="email"  className="form-label">
          Email Address
        </label>
        <input
        name="email"
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Your Email"
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Enter Your Message
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          name = "message"
          rows="3"
        ></textarea>
        <button className=" my-5 btn btn-primary" type="submit">
          Submit
        </button>
      </div>
 </form>
    </div>
  );
};

export default Contact;
