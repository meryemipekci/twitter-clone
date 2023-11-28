import Nav from "../components/nav";
import Aside from "../components/Aside";
import Main from "../components/Main";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
const Feed = () => {
  const [user, setUser] = useState();
  //firebaseden aktif kullanıcı verisini aldik
  //state e aktardik
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      }
    });
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
