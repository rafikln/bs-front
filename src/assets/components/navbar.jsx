import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r  bg-[#070c2b] shadow-lg h-20 px-8 flex   border-b-[3px] border-[#ded8d8]  justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img src="/header-logo.png" alt="Logo" className="w-[250px]" />
      </div>

      {/* Bouton Déconnexion */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("../");
        }}
        className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
      >
        <FaSignOutAlt className="text-lg" /> Déconnexion
      </button>
    </nav>
  );
};

export default NavBar;
