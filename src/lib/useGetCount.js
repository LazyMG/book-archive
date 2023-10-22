import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../fBase";

const useGetCount = () => {
  const [load, setLoad] = useState(true);
  const [fail, setFail] = useState(true);
  const [bookCount, setBookCount] = useState(0);

  const coll = collection(dbService, "books");

  const getBookCount = async () => {
    const snapshot = await getCountFromServer(coll);
    setBookCount(snapshot.data().count);
    if (bookCount !== 0) {
      setFail(false);
      setLoad(false);
    }
  };

  useEffect(() => {
    getBookCount();
  }, [bookCount]);

  return { load, fail, bookCount };
};

export default useGetCount;
