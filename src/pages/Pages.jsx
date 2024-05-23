import React from 'react';
import Home from './Home';
import Cuisines from './Cuisines';
import Contact from './Contact';
import { Route, Routes } from 'react-router-dom';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisines" element={<Cuisines />} />
      <Route path="/cuisines/:type" element={<Cuisines />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default Pages;
