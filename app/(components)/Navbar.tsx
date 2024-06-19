import React from "react";

const Navbar = () => {
  return (
    <div className="w-screen flex flex-row h-20 items-center justify-between ">
      <div className="mx-8">
        <h1 className=" text-2xl font-bold">Worksheet Creator</h1>
      </div>
      <div className="mx-8">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
