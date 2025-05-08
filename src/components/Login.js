

import { useNavigate, Link } from "react-router-dom";

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2/src/sweetalert2.js';



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
        Swal.fire(
          'Logged In successfully!',
          'success'
        )
        history("/Homemovies");
        console.log(userCredential);
      })
      .catch((error) => {
        setError(error.message); // Set error message
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <h4>Sign In Or Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={signIn}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                  </div>
                  <fieldset className="row mb-3"></fieldset>
                {error && <p className="text-danger">{error}</p>}     
                  <div className="form-group mb-3 text-center">
                    <button type="submit" className="btn btn-primary">
                      Sign In
                    </button>
                    <span className="home-text col-12">
                 <Link className="signup-text" to="/SignUp">Create Account</Link>
             
                 </span>
                  </div>
                </form>

                <div className="text-center">
                            <h4 className=" py-4"> Or sign in with:</h4>
                            <button className="buttons me-3 my-2">Google</button>
                            <button className="buttons my-2">facebook</button>

                            </div>
                    
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Login;
