import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else {
        if (password !== confirmPassword) {
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Auth Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FAF3F3] relative">
     
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBA2A3] to-[#AF8A7E] opacity-30 animate-pulse"></div>

      <div className="w-1/2 flex flex-col items-center justify-center p-10 text-white bg-[#EBA2A3] bg-opacity-90 shadow-lg rounded-r-3xl relative z-10">
        <img
          src="https://media.licdn.com/dms/image/v2/D563DAQFBCF9vO8EpzQ/image-scale_191_1128/image-scale_191_1128/0/1738575412328/lumetechnologies_cover?e=1741330800&v=beta&t=RqDZYFQaoRQopj9TotlcDsx3U9YanIgDd-sbDVwd24I"
          alt="Company Logo"
          className="w-120 h-20 transition-transform transform hover:scale-110"
        />
        <h2 className="text-3xl font-bold mt-4 animate-fade-in">Welcome to Our Platform</h2>
        <p className="mt-2 text-lg opacity-80">Power Perfected</p>
      </div>

     
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl transition duration-500 hover:scale-105 relative z-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#CD968B]">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
          
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-[#CD968B] focus:outline-none transition duration-300"
                required
              />
            </div>

        
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-[#AF8A7E] focus:outline-none transition duration-300"
                required
              />
            </div>

          
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-[#AF8A7E] focus:outline-none transition duration-300"
                  required
                />
              </div>
            )}

          
            <button
              type="submit"
              className={`w-full py-2 rounded mt-4 transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#CD968B] hover:bg-[#AF8A7E]"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

         
          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#CD968B] hover:underline transition duration-300"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
