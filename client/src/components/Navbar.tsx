import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signInSuccess } from "../slices/authSlice";
import { RootState } from "../store/store";

export default function Navbar() {
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex items-center gap-3 justify-center">
      {!user && (
        <Link
          className="bg-teal-500 py-1 px-5 my-1 rounded hover:bg-teal-600"
          to="/"
        >
          Login
        </Link>
      )}
      {user && (
        <>
          <Link
            className="bg-slate-100 py-1 px-5 my-1 rounded hover:bg-slate-200"
            to="/"
          >
            Home
          </Link>
          <button
            className="bg-teal-500 py-1 px-5 my-1 rounded hover:bg-teal-600"
            onClick={() => dispatch(signInSuccess(null))}
          >
            SignOut
          </button>
        </>
      )}
    </nav>
  );
}
