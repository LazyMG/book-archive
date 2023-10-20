import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../router/Home";
import My from "../router/My";
import NotFound from "../router/NotFound";
import Detail from "../router/Detail";
import Books from "../router/Books";

const AppRouter = ({ books, load, fail, bookCount }) => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home bookCount={bookCount} books={books} load={load} fail={fail} />
          }
        ></Route>
        <Route path="/my" element={<My bookCount={bookCount} />}></Route>
        <Route path="/books" element={<Books books={books} />}></Route>
        <Route
          path="/books/:id"
          element={<Detail books={books} bookCount={bookCount} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
