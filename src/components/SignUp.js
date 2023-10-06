import Footer from "./Footer";
import { useNavigate} from "react-router-dom";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FooterCopy from "./FooterCopy";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const history = useNavigate();
  const signedUp = (e) => {
   

    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history("/Homemovies");
      })
      .catch((error) => {
        setError(error.message); // Set error message
      });
  };

  return (
    <>
      <div className="constrain container col-md-4 my-5">
        <h1 className="home-text">Create User account </h1>
        <form onSubmit={signedUp}>
          <div className="row my-5">
            <div className="col-sm-10">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10">
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <fieldset className="row mb-3"></fieldset>
          {error && <p className="text-danger">{error}</p>}{" "}
          {/* Display error message */}
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <div className="col-12">
                  <span className="home-text col-12">
                    <button
                      className="btn signup-text btn-success"
                      type="submit"
                    >
                      Submit
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <FooterCopy />
    </>
  );
};

export default SignUp;
