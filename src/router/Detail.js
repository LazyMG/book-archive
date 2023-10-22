import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dbService } from "../fBase";
import Nav from "../components/Nav";
import Loading from "../components/Loading";
import useGetCount from "../lib/useGetCount";

const Detail = () => {
  const { id } = useParams();
  const [detailBook, setDetailBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [myComment, setMyComment] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const { bookCount, load: myLoading } = useGetCount();
  console.log(bookCount);

  const getBook = async (id) => {
    const documentRef = doc(dbService, "books", id);
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        //console.log("data: ", data);
        setDetailBook(data);
        setLoading(true);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateBook = async (id) => {
    const documentRef = doc(dbService, "books", id);
    try {
      if (Object.keys(detailBook).length === 0 || myComment === "") {
        console.log("fail");
        return;
      }

      const updatedBook = {
        ...detailBook,
        comment: commentProcessing(myComment),
      };
      await updateDoc(documentRef, updatedBook);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    getBook(id);
  }, [id]);

  const onChange = (event) => {
    const { value } = event.target;
    setMyComment(value);
  };

  const saveComment = () => {
    updateBook(id);
    setEditing((prev) => !prev);
  };

  const commentProcessing = (comment) => {
    if (comment === "") {
      return;
    }
    const processedComment = comment.replace(/\n/g, "&&");
    return processedComment;
  };

  const nextBook = () => {
    if (myLoading) return;
    let nextBookIndex = detailBook.index + 1;
    if (nextBookIndex >= bookCount) {
      return;
    }
    getBookID(nextBookIndex);
  };

  const prevBook = () => {
    if (myLoading) return;
    let prevBookIndex = detailBook.index - 1;
    if (prevBookIndex < 0) {
      return;
    }
    getBookID(prevBookIndex);
  };

  const getBookID = async (index) => {
    setLoading(false);
    const q = query(
      collection(dbService, "books"),
      where("index", "==", index)
    );
    const querySnapshot = await getDocs(q);
    const newBookId = querySnapshot.docs.map((doc) => doc.id);
    setLoading(true);
    navigate(`/books/${newBookId}`);
  };

  return (
    <>
      <Nav />
      <h1>Detail</h1>
      {loading ? (
        <>
          <img alt="img" src={detailBook.image} />
          <div>{detailBook.title}</div>
          <div>{detailBook.author}</div>
          <div>{detailBook.publisher}</div>
          {detailBook.comment !== '""'
            ? detailBook.comment
                .split("&&")
                .map((comment, index) => <div key={index}>{comment}</div>)
            : null}
          <textarea onChange={onChange}></textarea>
          <button onClick={saveComment}>
            {detailBook.comment !== "" ? "수정하기" : "저장하기"}
          </button>

          {/* 저장했으면 수정하기로 바꿈 */}
        </>
      ) : (
        <Loading />
      )}
      <button style={{ fontSize: "100px" }} onClick={prevBook}>
        {"<"}
      </button>
      <button style={{ fontSize: "100px" }} onClick={nextBook}>
        {">"}
      </button>
      <Footer />
    </>
  );
};

export default Detail;
