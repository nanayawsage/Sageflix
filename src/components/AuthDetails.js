import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {FaRegUser} from "react-icons/fa";


const AuthDetails = () => {
  

  const [authUser, setAuthUser] = useState(null);
  const auth = getAuth();
  const Navigate = useNavigate();

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
        Navigate ("/Login")
        console.log("sign Out successful");
      
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="">
      {authUser ? (
        <div>
          <p>
        
            {/* {`Signed In as: ${authUser.email}`} */}
            <button
              className="signOut-btn"
              onClick={UserSignOut}
            >
              Sign Out
            </button>
          </p>
        </div>
      ) :  (
        <div className="user">
        <FaRegUser />
        </div>
        
      )}
      
    </div>
  );
};

export default AuthDetails;
