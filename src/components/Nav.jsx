import { signOut } from "firebase/auth";
import { navSections } from "./../constants/index";
import { auth } from "../firebase/config";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-end p-2 py-4 ">
      <div>
        {/* logo */}
        <img className="w-14 mb-4" src="X_logo.jpg" alt="" />
        {/* navigasyon islemler */}
        {navSections.map((i, idx) => (
          <div
            key={idx}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#b5a7a7]"
          >
            {i.icon}
            <span className="hidden md:block">{i.title}</span>
          </div>
        ))}
      </div>
      {/* oturumu acik olan kullanici bilgileri */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-center md:justify-normal items-center gap-2">
          <img className="w-12 h-12 rounded-full" src={user?.photoURL} />
          <p className="hidden md:block font-bold">{user?.displayName}</p>
        </div>

        <button
          onClick={() => signOut(auth)}
          className="bg-gray-700 p-2 rounded-lg"
        >
          Cikis Yap
        </button>
      </div>
    </nav>
  );
};

export default Nav;
