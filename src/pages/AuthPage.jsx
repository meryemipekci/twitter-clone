import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // signInWithRedirect,
  // getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "./../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Authpage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [mail, setMail] = useState("");

  //hesabi  daha once aciksa
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/feed");
    }
  }, []);

  //formun gonderilme olayi
  const handleSubmit = (e) => {
    e.preventDefault();
    setMail(mail);
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      //yeni hesap olustur
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("hesabiniz olusturuldu");
        })
        .catch((err) => {
          toast.error(`sorry an error occured: ${err.code}`);
        });
    } else {
      // varolan hesaba giris yap
      signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("hesaba giris yapildi");
        })
        .catch((err) => {
          //sifresi yanlissa state i true ya cek
          if (err.code === "auth/invalid-login-credentials") {
            setShowErr(true);
          }
          toast.error(`sorry an error occured: ${err.code}`);
          console.dir(err);
        });
    }
  };

  //yonlendirerek hesap acinca
  //sonuclara erisme

  //  google ile giris
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      console.log(res);
      toast.success("google hesabiniz ile giris yapildi");
      navigate("feed");
    } catch (err) {
      console.log(err);
    }
  };

  //sifre sifirlama istegi gonderir
  const handleReset = () => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        toast.info(`${mail}> mailinize sifirlama e postasi gonderildi`);
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`sorry an error occured: ${errorCode}`);
        // ..
      });
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/X_logo.jpg" alt="twitter logo" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter giris yap</h1>

        <div
          onClick={handleGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full
         cursor-pointer gap-3 text-black"
        >
          <img className="h-[20px]" src="/g-logo.png" alt="googlr logo" />
          <span className="whitespace-nowrap">Google ile giris yap</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shodow-[gray]"
            type="email"
            required
          />
          <label className="mt-5">Sifre</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shodow-[gray]"
            type="text"
            required
          />
          <button className="text-black bg-white mt-10 rounded-full p-1 font-bold hover:bg-gray-300">
            {signUp ? "Kaydol" : " Giris yap"}
          </button>
          <p className="mt-5 flex gap-4">
            <span className="text-gray-500">
              {signUp ? "Hesabiniz varsa" : "Hesabiniz yoksa"}{" "}
            </span>
            <span
              onClick={() => setSignUp(!signUp)}
              className="cursor-pointer text-blue-500"
            >
              {signUp ? "Giris Yap" : "Kaydol"}{" "}
            </span>
          </p>
        </form>
        {showErr && (
          <p
            onClick={handleReset}
            className="text-red-400 cursor-pointer text-center"
          >
            sifrenizi mi unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default Authpage;
