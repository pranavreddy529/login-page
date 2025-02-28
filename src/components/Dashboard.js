import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBA2A3] relative">
 
      <img 
        src="./novalume_logo.png" 
        alt="Company Logo" 
        className="h-12 mr-6 bg-white p-2 rounded-lg shadow-md" 
      />

   
      <p className="text-lg text-[#7D6A5A] text-center mb-6">
        Discover new possibilities with cutting-edge technology designed for excellence.
      </p>

   
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-[#CD968B] text-white rounded-lg hover:bg-[#AF8A7E] transition absolute bottom-6 right-6"
      >
        Logout
      </button>
    </div>
  );
}
