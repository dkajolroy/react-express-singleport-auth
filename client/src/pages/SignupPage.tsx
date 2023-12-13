import axios from "axios";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../config/toast";
import { signInSuccess } from "../slices/authSlice";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((s) => ({ ...s, [event.target.name]: event.target.value }));
  }

  const dispatch = useDispatch();
  async function onsubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = toast.loading("Please wait...");
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        dispatch(signInSuccess(res.data.user));
        toastSuccess(id, "Signup Success ");
        navigate("/");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const err =
        error.response && error.message
          ? error.response.data?.message
          : "Something went wrong";

      toastError(id, err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <form onSubmit={onsubmit} className="flex bg-white flex-col gap-3 p-10">
        <h2 className="text-xl">Signup please</h2>
        <input
          onChange={onChange}
          type="text"
          name="name"
          placeholder="Full Name"
          className="border px-5 py-1 outline-gray-300"
        />
        <input
          onChange={onChange}
          type="text"
          name="email"
          placeholder="Email address"
          className="border px-5 py-1 outline-gray-300"
        />
        <input
          onChange={onChange}
          type="text"
          name="password"
          placeholder="Password"
          className="border px-5 py-1 outline-gray-300"
        />
        <button
          className="bg-teal-500 flex justify-center gap-2 rounded items-center py-1 text-white hover:bg-teal-600"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin">
                <ImSpinner2 />
              </span>
              Loading
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
