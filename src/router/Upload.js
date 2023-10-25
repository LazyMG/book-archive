import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fBase";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useForm } from "react-hook-form";
import useGetCount from "../lib/useGetCount";

const Upload = () => {
  const [myBookCount, setMyBookCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm();

  const { bookCount } = useGetCount();

  const dbObj = {
    title: "",
    author: "",
    publisher: "",
    image: "",
    site: "",
    comment: "",
    date: new Date().getTime(),
    index: 0,
    subtitle: "",
  };

  const navigate = useNavigate();

  const onValid = async ({
    title,
    author,
    publisher,
    image,
    site,
    subtitle,
  }) => {
    //await addDoc(collection(dbService, "books"), inputValues);
    if (loading) {
      alert("기다려주세요");
    }

    const newBook = await addDoc(collection(dbService, "books"), {
      ...dbObj,
      title,
      author,
      publisher,
      image,
      site,
      index: myBookCount,
      subtitle: subtitle ? subtitle : "",
    });
    const id = newBook._key.path.segments[1];
    navigate(`/books/${id}`);
  };

  useEffect(() => {
    if (bookCount !== 0) {
      setMyBookCount(bookCount);
      setLoading(false);
    }
  }, [bookCount]);

  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="title">서명: </label>
          <input
            {...register("title", {
              required: true,
            })}
            id="title"
            type="text"
            placeholder="서명"
            required
          />
        </div>
        <div>
          <label htmlFor="text">부제: </label>
          <input
            {...register("subtitle")}
            id="subtitle"
            type="text"
            placeholder="부제"
            required
          />
        </div>
        <div>
          <label htmlFor="author">작가: </label>
          <input
            {...register("author", {
              required: true,
            })}
            id="author"
            type="text"
            placeholder="작가"
            required
          />
        </div>
        <div>
          <label htmlFor="publisher">출판사: </label>
          <input
            {...register("publisher", {
              required: true,
            })}
            id="publisher"
            type="text"
            placeholder="출판사"
            required
          />
        </div>
        <div>
          <label htmlFor="image">표지: </label>
          <input
            {...register("image", {
              required: true,
            })}
            id="image"
            type="text"
            placeholder="책 표지"
            required
          />
        </div>
        <div>
          <label htmlFor="site">구매 사이트: </label>
          <input
            {...register("site", {
              required: true,
            })}
            id="site"
            type="text"
            placeholder="구매 사이트"
            required
          />
        </div>
        <input type="submit" value="등록하기" />
      </form>
      <Footer />
    </div>
  );
};

export default Upload;
