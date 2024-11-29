"use client";

import { NEXT_PUBLIC_BACKEND } from "@/contants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND}/api/auth/local`,
        {
          identifier: email,
          password,
        }
      );

      localStorage.setItem("token", response.data.jwt);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login successful", response.data);
      router.push("/");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred.";
      alert(`Login failed. Please try again. ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-0 flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500 text-black">
      <div className="bg-white shadow-lg rounded-lg p-12 md:p-8 max-w-md w-full">
        <h1 className="text-center text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="bg-black text-white rounded-lg p-2 hover:bg-green-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
