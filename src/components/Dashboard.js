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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBA2A3]">
      {/* Logo */}
      <img src="https://media.licdn.com/dms/image/v2/D563DAQFBCF9vO8EpzQ/image-scale_191_1128/image-scale_191_1128/0/1738575412328/lumetechnologies_cover?e=1741276800&v=beta&t=Uaa8p-9dpKFXlpvdvSr93Q-DnYfgB27tKkSoBVYlKfU" alt="Company Logo" className="w-120 h-32 mb-4" />

      {/* Caption */}
      <h2 className="text-3xl font-semibold text-white mb-2">Power Perfected</h2>

     

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-[#CD968B] text-white rounded-lg hover:bg-[#AF8A7E] transition"
      >
        Logout
      </button>
    </div>
  );
}
