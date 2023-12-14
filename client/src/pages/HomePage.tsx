import { ImCheckboxChecked, ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function HomePage() {
  const { user } = useSelector((s: RootState) => s.auth);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
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
          </>
        )}
      </h2>
    </div>
  );
}
