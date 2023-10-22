import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../fBase";

const useGetBooks = () => {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(true);
  const [fail, setFail] = useState(true);

  const coll = collection(dbService, "books");

  useEffect(() => {
    const q = query(coll);
    onSnapshot(q, (snapshot) => {
      const bookArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (bookArr.length === 0) {
        setFail(false);
        return;
      }
      setBooks(bookArr);
      setLoad(false);
    });
  }, []);

  return { books, load, fail };
};

export default useGetBooks;
