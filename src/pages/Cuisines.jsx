import React from "react";
import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";
import Categories from "../components/Categories";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {  } from "react-router-dom";

function Cuisines() {
  return (
    <>
     <div className="md:px-28 px-5 h-screen bg-center md:bg-cover flex-col gap-10 roboto">
      <Categories/>
      {/* <Popular/>

     <Vegetarian /> */}

     </div>
    </>
  );
}

export default Cuisines;
