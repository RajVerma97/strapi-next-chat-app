"use client";

import { NEXT_PUBLIC_BACKEND } from "@/contants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const [, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND}/api/auth/local/register`,
        {
          username,
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.jwt);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess("Registration successful! You can now log in.");

      router.push("/");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred.";
      alert(`Registration  failed. Please try again. ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen  p-3 pb-5 sm:p-2 sm:pb-4  md:p-0  flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-400 text-black ">
      <div className="bg-white  shadow-lg rounded-lg  p-4 sm:p-8 md:p-16 max-w-2xl  w-full">
        <h1 className="text-center text-black text-3xl font-bold mb-10">
          Register
        </h1>
        <form onSubmit={handleRegister} className="grid   gap-2 sm:gap-4">
          <label htmlFor="email" className=" text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border  border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border   border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label htmlFor="username" className="text-lg">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border   border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-black col-span-2 h-full py-2   text-white rounded-lg  hover:bg-blue-600 transition duration-200  "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
