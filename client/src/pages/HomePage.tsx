import axios from "axios";
import { ImCheckboxChecked, ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
export default function HomePage() {
  const { user } = useSelector((s: RootState) => s.auth);

  async function verify() {
    await axios.post(
      "/api/user/profile",
      {},
      { headers: { "Content-Type": "application/json" } }
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-10">Protected Route</h1>
      {user?.image && (
        <div className="w-20  h-20 ">
          <img src={user.image} className="rounded-full" alt="my image" />
        </div>
      )}
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <h2>{user?.email}</h2>
      <h2 className="flex items-center gap-2">
        {user?.isEmailVarify ? (
          <>
            <span className="text-green-600">
              <ImCheckboxChecked />
            </span>
            Email Varifyed
          </>
        ) : (
          <>
            <span className="text-green-600">
              <ImCross />
            </span>
            Not Varifyed
            <button
              onClick={verify}
              className="bg-blue-500 text-white rounded px-2 hover:bg-blue-600"
            >
              Verify
            </button>
          </>
        )}
      </h2>
    </div>
  );
}
