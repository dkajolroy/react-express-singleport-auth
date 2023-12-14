import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ImGoogle } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase";
import { signInSuccess } from "../slices/authSlice";

export default function Oauth() {
  const initApp = new GoogleAuthProvider();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signInProccess() {
    try {
      const result = await signInWithPopup(auth, initApp);

      const user = {
        name: result.user.displayName,
        image: result.user.photoURL,
        email: result.user.email,
        emailVarify: result.user.emailVerified,
        password: "blank",
      };
      const res = await axios.post("/api/auth/oauh", user, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        dispatch(signInSuccess(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={signInProccess}
      className="border flex justify-center gap-2 rounded items-center py-1 text-slate-600 hover:bg-slate-100"
      type="button"
    >
      <ImGoogle />
      <span>Signin with google</span>
    </button>
  );
}
