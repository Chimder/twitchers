import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
          <Route path='streamer/:id' element={<Streamer />}></Route>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path='*' element={<Navigate to='/' replace />}></Route>
      </Routes>
    </>
  );
};
