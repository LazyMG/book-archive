import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import "firebase/firestore";
import useGetBooks from "../lib/useGetBooks";
import useGetCount from "../lib/useGetCount";

const Home = () => {
  const [homeBook, setHomeBook] = useState({});
  const { books, load, fail } = useGetBooks();
  const { bookCount: myBookCount } = useGetCount();

  useEffect(() => {
    if (books.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = { ...books[randomIndex] };
    setHomeBook(randomBook);
  }, [books, myBookCount]);

  const getPrevBook = () => {
    let prevBookIndex = homeBook.index - 1;
    if (prevBookIndex < 0) {
      prevBookIndex = myBookCount - 1;
    }
    setHomeBook(books.sort((a, b) => a.index - b.index)[prevBookIndex]);
  };

  const getNextBook = () => {
    let nextBookIndex = homeBook.index + 1;
    if (nextBookIndex >= myBookCount) {
      nextBookIndex = 0;
    }
    setHomeBook(books.sort((a, b) => a.index - b.index)[nextBookIndex]);
  };

  return (
    <div>
      <Nav />
      <h1>Home</h1>
      {!load ? (
        <>
          <Book book={homeBook} />
          <button onClick={getPrevBook} style={{ fontSize: "100px" }}>
            {"<"}
          </button>
          <button onClick={getNextBook} style={{ fontSize: "100px" }}>
            {">"}
          </button>
        </>
      ) : !fail ? (
        <div>책없음 등록필요</div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
