import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../services/authApi";

const Home = () => {
  const navigate = useNavigate("");
  const { user, logOut } = useSession();
  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      logOut(data);
      navigate("/login");
    } catch (error) {
      console.log("error ", error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Welcome,</h2>
      <p>You have sucessfully logged in and verified Your 2FA</p>
      <button
        type="button"
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
