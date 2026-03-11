import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 bg-white">
            {/* Container */}
            <div className="w-full max-w-[440px] flex flex-col">
                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-tight leading-7">
                        {isLogin
                            ? "YOUR ACCOUNT FOR EVERYTHING UNIWUE"
                            : "BECOME A UNIWUE MEMBER"
                        }
                    </h2>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>

                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:border-black outline-none transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:border-black outline-none transition-all"
                            />
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:border-black outline-none transition-all"
                    />

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:border-black outline-none transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Utility Links */}
                    <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-black border-gray-300 rounded cursor-pointer"
                            />
                            <span className="text-[12px] text-gray-500 group-hover:text-black transition-colors">
                                Keep me signed in
                            </span>
                        </label>
                        {isLogin && (
                            <button type="button" className="text-[12px] text-gray-400 hover:text-black underline transition-colors">
                                Forgot password?
                            </button>
                        )}
                    </div>

                    {/* Legal Disclaimer */}
                    <p className="text-[12px] text-gray-400 text-center mt-4 leading-5">
                        By {isLogin ? "logging in" : "continuing"}, you agree to UNIWUE's{" "}
                        <span className="text-black underline cursor-pointer">Privacy Policy</span> and{" "}
                        <span className="text-black underline cursor-pointer">Terms of Use</span>.
                    </p>

                    {/* CTA Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-4 rounded-md uppercase tracking-widest text-xs mt-4 hover:bg-zinc-800 transition-all active:scale-[0.98]"
                    >
                        {isLogin ? "Sign In" : "Join Us"}
                    </button>
                </form>

                {/* Toggle View */}
                <div className="mt-10 text-center border-t border-gray-100 pt-8">
                    <p className="text-sm text-gray-500">
                        {isLogin ? "Not a Member?" : "Already a Member?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-black font-bold underline hover:opacity-70 transition-opacity ml-1"
                        >
                            {isLogin ? "Join Us." : "Sign In."}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;