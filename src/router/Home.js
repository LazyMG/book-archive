import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { dbService } from "../fBase";
import "firebase/firestore";
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Home = ({ books, load, fail, bookCount }) => {
  const [homeBook, setHomeBook] = useState({});
  const coll = collection(dbService, "books");

  // console.log("from home bookCount:", bookCount);

  useEffect(() => {
    if (books.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = { ...books[randomIndex] };
    setHomeBook(randomBook);
    console.log(randomBook);
  }, [books]);

  const getPrevBook = () => {
    let myIndex = homeBook.index - 1;
    if (myIndex < 0) {
      myIndex = bookCount - 1;
    }
    getBook(myIndex);
  };

  const getNextBook = () => {
    let myIndex = homeBook.index + 1;
    if (myIndex >= bookCount) {
      myIndex = 0;
    }
    getBook(myIndex);
  };

  const getBook = async (index) => {
    const q = query(coll, where("index", "==", index));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    setHomeBook(...data);
  };

  return (
    <div>
      <Nav />
      <h1>Home</h1>
      {load ? (
        <Book book={homeBook} />
      ) : fail ? (
        <div>책없음 등록필요</div>
      ) : (
        <Loading />
      )}
      <button onClick={getPrevBook} style={{ fontSize: "100px" }}>
        {"<"}
      </button>
      <button onClick={getNextBook} style={{ fontSize: "100px" }}>
        {">"}
      </button>
    </div>
  );
};

export default Home;
