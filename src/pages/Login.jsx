// components/LoginWithGoogle.jsx
import React from "react";

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="backdrop-blur-md bg-white/70 border border-white/30 shadow-md rounded-xl p-8 w-full max-w-sm text-center">
            <h2 className="text-2xl font-light text-gray-800 mb-2 tracking-wide">
              Sign in
            </h2>
            <p className="text-sm text-gray-500 mb-6">Use your Google account</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg shadow-sm transition duration-200"
            >
            
              Continue with Google
            </button>
          </div>
        </div>
      );
};

export default Login;
