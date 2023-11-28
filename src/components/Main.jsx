import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Form from "./Form";
import Post from "./Post";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import Loading from "./Loading";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db, "tweets");

  useEffect(() => {
    // filtreleme ayarlari tanimlama
    const options = query(tweetsCol, orderBy("createdAt", "desc"));

    onSnapshot(options, (snapshot) => {
      //tweetleri gecici olarak tuttugumuz dizi
      const tempTweets = [];
      //her bir dokumanın verisine erişip diziye aktar
      snapshot.forEach((doc) => {
        tempTweets.push({ ...doc.data(), id: doc.id });
      });
      //verileri state e aktarma
      setTweets(tempTweets);
      // console.log(tempTweets);
    });
  }, []);

  return (
    <main className=" border overflow-y-auto border-gray-700 ">
      <header className="font-bold p-[18px] border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      {/* form */}

      <Form user={user} />
      {!tweets ? (
        <Loading />
      ) : (
        tweets?.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
