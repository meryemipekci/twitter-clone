import { FaSearch } from "react-icons/fa";
const Aside = () => {
  return (
    <div className="hidden lg:block ">
      <div className="flex w-full justify-center items-center m-5">
        <input
          className=" w-full rounded-xl p-2 bg-blue-200"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Aside;
