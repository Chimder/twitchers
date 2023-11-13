import React from "react";
import { Route, Routes } from "react-router-dom";
import { UpWhenReload } from "@/components/UpWhenReload";
import { Home } from "@/pages/Home/Home";
import { Layout } from "@/pages/Layout";
import { Streamer } from "@/pages/Streamer/Streamer";

export const App = () => {
  return (
    <>
      <UpWhenReload />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='streamer/:name' element={<Streamer />}></Route>
        </Route>
      </Routes>
    </>
  );
};
