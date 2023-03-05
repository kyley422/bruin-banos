import { auth, provider } from "../../firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");
  var reviews = ["id1", "id2", "id3"]
  var likedReviews = ["id4", "id5", "id6"]

  const createUserDoc = async () => {
    await addDoc(usersCollectionRef, {
      id: auth.currentUser.uid, 
      name: auth.currentUser.displayName,
      reviews: reviews,
      likes: likedReviews
    });
    navigate("/");
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true)
      // user_doc = getDoc(db, userID)
      // if user_doc is none:
      //    createUserDoc()
      createUserDoc()
      navigate("/")
    });
  };

  return (
    <div className='loginPage'>
      <p>Sign In With Google to Continue</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}> 
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;