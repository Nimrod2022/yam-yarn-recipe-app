import React from "react";
import Home from "./Home";
import Cuisines from "./Cuisines";
import Contact from "./Contact";
import Searched from "./Searched";
import { Route, Routes } from "react-router-dom";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Recipe from "./Recipe";

function Pages() {
  return (
    <>
      {/* <Search />
      <Categories /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisines" element={<Cuisines />} />
        <Route path="/cuisines/:type" element={<Cuisines />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cuisines/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </>
  );
}

export default Pages;
