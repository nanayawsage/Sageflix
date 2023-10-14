import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { MdCheckBox } from "react-icons/md";

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
        Swal.fire("Account created successfully!", "success");
        history("/Homemovies");
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
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={signedUp}>
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
                  <div className="d-flex">
                    <MdCheckBox />
                    <p className="me-3">
                      I accept terms and conditions on SageFlix
                    </p>
                  </div>
                  <div className="form-group text-center mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn "
                    >
                      Create an account for free
                    </button>
                  </div>
                </form>
                <div className="text-center">
                  <h4 className=" py-4"> Or register with:</h4>
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

export default SignUp;
