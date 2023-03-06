import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

import "./Login.scss";
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
  rel="stylesheet"
></link>;

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");

  var reviews = [];
  var likedReviews = [];

  const createUserDoc = async () => {
    await addDoc(usersCollectionRef, {
      id: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      reviews: reviews,
      likedReviews: likedReviews,
    });
    navigate("/");
  };

  const checkIfExists = async () => {
    const q = query(
      usersCollectionRef,
      where("id", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);

    // If user doc doesn't exist, create a new user doc
    if (snapshot.empty) {
      console.log("User does not exist yet");
      createUserDoc();
    } else {
      console.log("User already exists");
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      checkIfExists();
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <box className="background-box">
        <box className="textbox">
          <p>Log in / Sign Up</p>
        </box>

        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </box>
    </div>
  );
}

export default Login;
