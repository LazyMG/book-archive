import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../fBase";
import { useForm } from "react-hook-form";

const Modify = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [detailBook, setDetailBook] = useState({});
  const navigate = useNavigate();

  const getBook = async (id) => {
    const documentRef = doc(dbService, "books", id);
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        setDetailBook(data);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBook(id);
  }, [id]);

  const updateBook = async (id, newData) => {
    const documentRef = doc(dbService, "books", id);
    const nonEmptyFields = newData;

    try {
      const updatedBook = {
        ...detailBook,
        ...nonEmptyFields,
      };
      await updateDoc(documentRef, updatedBook);
      console.log("Document updated successfully");
      navigate(`/books/${id}`);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const onValid = (data) => {
    if (window.confirm("수정하시겠습니까?")) {
      const newData = validataData(data);
      updateBook(id, newData);
    } else {
      return;
    }
  };

  const validataData = (data) => {
    const nonEmptyFields = {};

    for (const key in data) {
      if (data[key] !== "") {
        nonEmptyFields[key] = data[key];
      }
    }

    return nonEmptyFields;
  };

  const gotoDetail = () => {
    navigate(`/books/${id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="title">서명: </label>
          <input
            {...register("title")}
            id="title"
            type="text"
            placeholder={detailBook.title}
          />
        </div>
        <div>
          <label htmlFor="subtitle">부제: </label>
          <input
            {...register("subtitle")}
            id="subtitle"
            type="text"
            placeholder={detailBook.subtitle}
          />
        </div>
        <div>
          <label htmlFor="author">작가: </label>
          <input
            {...register("author")}
            id="author"
            type="text"
            placeholder={detailBook.author}
          />
        </div>
        <div>
          <label htmlFor="publisher">출판사: </label>
          <input
            {...register("publisher")}
            id="publisher"
            type="text"
            placeholder={detailBook.publisher}
          />
        </div>
        <div>
          <label htmlFor="image">표지: </label>
          <input
            {...register("image")}
            id="image"
            type="text"
            placeholder={detailBook.image}
          />
        </div>
        <div>
          <label htmlFor="site">구매 사이트: </label>
          <input
            {...register("site")}
            id="site"
            type="text"
            placeholder={detailBook.site}
          />
        </div>
        <input type="submit" value="수정하기" />
      </form>
      <button onClick={gotoDetail}>돌아가기</button>
    </div>
  );
};

export default Modify;
