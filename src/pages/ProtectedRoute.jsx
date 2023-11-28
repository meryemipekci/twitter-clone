import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  //kullanıcının yetkisi var mi state i
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //aktif oturumdaki degişiklik
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  //kullanicinin yetkisi yoksa logine yönlendir

  if (isAuth === false) return <Navigate to={"/"} replace />;
  //kullanıcının yetkisi varsa alt route u goster
  return <Outlet />;
};

export default ProtectedRoute;
