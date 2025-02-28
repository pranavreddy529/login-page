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
        src="https://mail.google.com/mail/u/0?ui=2&ik=d5bd152f61&attid=0.1&permmsgid=msg-f:1825316892798453778&th=1954d40b05c58812&view=fimg&fur=ip&permmsgid=msg-f:1825316892798453778&sz=s0-l75-ft&attbid=ANGjdJ-TUZj0MmOHWrdJ4jWIgh-NPSzToRyke8Nodda8lnYWSmf8V2lfn9EDp-qlmkKbDnwj9wD_iPwHd5W1g8ArqvOLRq8r3zceYInUClUT5XECmlVYG8LXpz7StFM&disp=emb&realattid=ii_m7oy9cqc0&zw" 
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
