

import { useNavigate, Link } from "react-router-dom";

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import FooterCopy from "./FooterCopy";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        history("/Homemovies");
        console.log(userCredential);
      })
      .catch((error) => {
        setError(error.message); // Set error message
      });
  };

  return (
    <>
      <div className="constrain container col-md-4 my-5">
        <h1 className="home-text">Sign In or Sign Up</h1>
        <form onSubmit={signIn}>
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
          {error && <p className="text-danger">{error}</p>} {/* Display error message */}
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Sign In
                  </button>
                  <span className="home-text col-12">
                 
                  <Link className="signup-text" to="/SignUp">Create Account</Link>
              
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
    
      </div>
   
    </>
  );
};

export default Login;
