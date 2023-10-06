import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState} from "react";

const AuthDetails = () => {
  

  const [authUser, setAuthUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [auth]);

  const UserSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign Out successful");
      
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container ">
      {authUser ? (
        <div>
          <h4>
            {`Signed In as: ${authUser.email}`}{" "}
            <button
              className="signOut-btn btn btn-success my-3"
              onClick={UserSignOut}
            >
              Sign Out
            </button>
          </h4>
        </div>
      ) :  (
        
        <p>Not Signed In</p>
        
      )}
      
    </div>
  );
};

export default AuthDetails;
