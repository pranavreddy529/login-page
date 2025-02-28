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
    <div className="min-h-screen bg-[#FAF3F3] flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-[#675941] p-4 flex items-center shadow-md">
        <img
          src="./novalume_logo.png"
          alt="Novalume Logo"
          className="h-12 mr-6 bg-white p-2 rounded-lg shadow-md"
        />
        <div className="flex space-x-6 text-white font-medium">
          <a href="/" className="hover:underline">Home</a>
          <a href="/products" className="hover:underline">Products</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </nav>
      
      {/* Auth Form */}
      <div className="flex flex-col items-center justify-center flex-grow w-full p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg relative z-10">
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
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-[#CD968B] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-[#AF8A7E] focus:outline-none"
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
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-[#AF8A7E] focus:outline-none"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2 rounded mt-4 text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#CD968B]"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#CD968B] hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

