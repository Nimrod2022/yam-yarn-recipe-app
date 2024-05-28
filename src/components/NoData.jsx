import React from "react";

function NoData() {
  return (
    <div className="h-screen pt-10">
      <p className=" md:text-lg text-center items-center text-rose-700">
        Unfortunately we have reached the maximum Number of API calls per day! 
      </p>
    </div>
  );
}

export default NoData;
