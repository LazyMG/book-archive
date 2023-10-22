import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fBase";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useForm } from "react-hook-form";
import useGetCount from "../lib/useGetCount";

const My = () => {
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

    await addDoc(collection(dbService, "books"), {
      ...dbObj,
      title,
      author,
      publisher,
      image,
      site,
      index: myBookCount,
      subtitle: subtitle ? subtitle : "",
    });

    navigate("/books");
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
        <input
          {...register("title")}
          name="title"
          type="text"
          placeholder="서명"
          required
        />
        <input
          {...register("subtitle")}
          name="subtitle"
          type="text"
          placeholder="부제"
        />
        <input
          {...register("author")}
          name="author"
          type="text"
          placeholder="작가"
          required
        />
        <input
          {...register("publisher")}
          name="publisher"
          type="text"
          placeholder="출판사"
          required
        />
        <input
          {...register("image")}
          name="image"
          type="text"
          placeholder="책 표지"
          required
        />
        <input
          {...register("site")}
          name="site"
          type="text"
          placeholder="구매 사이트"
          required
        />
        <input type="submit" value="만들기" />
      </form>
      <Footer />
    </div>
  );
};

export default My;
