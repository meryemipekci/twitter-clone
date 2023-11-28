import moment from "moment/moment";
import "moment/locale/tr";
import { auth, db } from "./../firebase/config";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import DropDown from "./DropDown";

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);
  //tweet zamnı hesaplama
  const date = moment(tweet.createdAt?.toDate()).fromNow();
  // console.log(date);

  //kullanıcının tweeti begenip begenmedigini belirleme

  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
    setIsLiked(found);
  }, [tweet]);

  //tweet i siler
  const handleDelete = async () => {
    if (confirm("tweet silinecek onaylıyor musunuz?")) {
      //simek istedigimiz belgenın ref alma
      const docRef = doc(db, "tweets", tweet.id);
      console.log(docRef);
      //dokumanlari silme
      await deleteDoc(docRef);
    }
  };
  //like atmaya ve geri cekmeye yrar
  const toggleLike = async () => {
    const docRef = doc(db, "tweets", tweet.id);
    await updateDoc(docRef, {
      //diziye tweeti likelayan kullanıcı idsini ekleme
      likes: isLiked
        ? //diziden tweeti lie layan kullanıcının idsini eklemee
          arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  // Check if tweet.user and tweet.user.name are defined and tweet.user.name is a string
  if (!tweet.user || !tweet.user.name || typeof tweet.user.name !== "string") {
    return null; // or handle the case where tweet.user or tweet.user.name is undefined
  }
  const handleSave = (e) => {
    e.preventDefault();

    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      isEdited: true,
      textContent: e.target[0].value,
    });
    setIsEditModel(false);
  };
  return (
    <div className="flex gap-3 p-3 border-b-[1] border-gray-600">
      <img
        className="w-14 h-14 rounded-full"
        src={tweet.user.photo}
        alt="user_photo"
      />
      <div className="w-full">
        {/* ust kisim kullanici bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="fond-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              handleDelete={handleDelete}
              handleEdit={() => setIsEditModel(true)}
            />
          )}
        </div>
        {/* orta kisim tweet iceriği */}
        <div className="my-3">
          {isEditModel ? (
            <form onSubmit={handleSave}>
              <input
                className="text-black"
                type="text"
                defaultValue={tweet.textContent}
              />
              <button
                className="btn bg-red"
                type="button"
                onClick={() => setIsEditModel(false)}
              >
                red
              </button>

              <button className="btn btn-success" type="submit">
                kayit
              </button>
            </form>
          ) : (
            <p>{tweet?.textContent}</p>
          )}

          {/* eger foto vasa onu ekrane bas */}
          {tweet.imageContent && (
            <img
              className="w-full object-contain max-h-[300px] mt-4 rounded-xl"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* alt kisim > etkilesim butonlari */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00a2ff6a]">
            <BiMessageRounded />
            <span>{Math.round(Math.random() * 900)} </span>
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00ff6e6a]">
            <FaRetweet />
            <span>{Math.round(Math.random() * 900)} </span>
          </div>
          <div
            onClick={toggleLike}
            className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#ff19006a]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#a29d9d6a]">
            <FiShare2 />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Post;
