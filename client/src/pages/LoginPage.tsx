import axios from "axios";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";
import { toastError, toastSuccess } from "../config/toast";
import { signInSuccess } from "../slices/authSlice";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((s) => ({ ...s, [event.target.name]: event.target.value }));
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading((s) => !s);
    const id = toast.loading("Please wait...");
    try {
      const res = await axios.post(`/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        dispatch(signInSuccess(res.data.user));
        toastSuccess(id, res.data.message);
        setIsLoading(false);
        navigate("/");
      }

      setIsLoading(false);
    } catch (error: any) {
      const err =
        error.response && error.message
          ? error.response.data?.message
          : error.message;
      toastError(id, err);
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-200">
      <div className="max-w-lg p-10 bg-white rounded">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl">Login Please</h2>
          <input
            onChange={onChange}
            name="username"
            type="text"
            placeholder="Username"
            className="border px-5 py-1 outline-gray-300"
          />
          <input
            onChange={onChange}
            name="password"
            type="text"
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
          <Oauth />

          <Link to="/signup">
            Don't have an account to
            <span className="text-blue-500"> SignUp</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
