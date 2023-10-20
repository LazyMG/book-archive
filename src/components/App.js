import { useEffect, useState } from "react";
import AppRouter from "./Router";
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
} from "firebase/firestore";
import { dbService } from "../fBase";

function App() {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  const [fail, setFail] = useState(false);
  const [bookCount, setBookCount] = useState(0);

  const coll = collection(dbService, "books");

  const getBookCount = async () => {
    const snapshot = await getCountFromServer(coll);
    // console.log("in App count: ", snapshot.data().count);
    setBookCount(snapshot.data().count);
  };

  useEffect(() => {
    const q = query(coll);
    onSnapshot(q, (snapshot) => {
      const bookArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (bookArr.length === 0) {
        setFail(true);
        return;
      }
      setBooks(bookArr);
      setLoad(true);
    });
  }, []);

  useEffect(() => {
    getBookCount();
    // console.log(bookCount);
  }, [bookCount]);

  return (
    <div className="App">
      <AppRouter books={books} load={load} fail={fail} bookCount={bookCount} />
    </div>
  );
}

export default App;
