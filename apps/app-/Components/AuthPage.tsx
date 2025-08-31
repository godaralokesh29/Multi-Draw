"use client";
import axios from "axios";
import { useState } from "react";

export function AuthPage({isSignin}: {isSignin: boolean}) { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="text-2xl font-bold">
            {isSignin ? "Sign In" : "Sign Up"}
        </div>
        <div className="w-full max-w-md">
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder={username ? "Username" : "Enter your username"}
                    className="p-2 border rounded"
                    onChange={(e)=> setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={password ? "Password" : "Enter your password"}
                    className="p-2 border rounded"
                    onChange={(e)=> setPassword(e.target.value)}
                />
                {!isSignin && (
                    <input
                        type="text"
                        placeholder={name ? "Name" : "Enter your name"}
                        className="p-2 border rounded"
                        onChange={(e)=> setName(e.target.value)}
                    />
                )}
                <button 
                    onClick={async (e)=>{
                        const res=await axios.post("http://localhost:3000/signup",{
                            name,
                            username,   
                            password
                        })
                    }}
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    {isSignin ? "Sign In" : "Sign Up"}
                </button>

                <button>
                    <a href={isSignin ? "/signup" : "/signin"} className="text-blue-500 hover:underline">
                        {isSignin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </a>
                </button>
            </form>
        </div>
        </div> 
    );

}