import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return <div className=" flex justify-center items-center">
 <Link to="/" className="self-start">
        <strong style={{ float: "left" }} className="mt-3 bg-Secondary text-white px-2 py-1 rounded cursor-pointer">
          Go back
        </strong>
      </Link>
  <img src="/public/images/404.jpg" alt="Not Found" className=""/>
  </div>;
};

export default NotFound;
