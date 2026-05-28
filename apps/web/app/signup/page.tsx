"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signup() {
    try {
      await axios.post(`${BACKEND_URL}/signup`, {
        name,
        username,
        password
      });

      router.push("/signin");
    } catch (e) {
      alert("Signup failed");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>
      </div>
    </div>
  );
}