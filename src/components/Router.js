import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../router/Home";
import NotFound from "../router/NotFound";
import Detail from "../router/Detail";
import Books from "../router/Books";
import Modify from "../router/Modify";
import Upload from "../router/Upload";
import Profile from "../router/Profile";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/books/:id" element={<Detail />}></Route>
        <Route path="/books/modify/:id" element={<Modify />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
