import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../router/Home";
import My from "../router/My";
import NotFound from "../router/NotFound";
import Detail from "../router/Detail";
import Books from "../router/Books";
import Modify from "../router/Modify";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/my" element={<My />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/books/:id" element={<Detail />}></Route>
        <Route path="/books/modify/:id" element={<Modify />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
