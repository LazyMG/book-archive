import { addDoc, collection, getCountFromServer } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fBase";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useForm } from "react-hook-form";

const My = ({ bookCount }) => {
  const [myBookCount, setMyBookCount] = useState(0);
  const [isCount, setIsCount] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const sampleObj = {
    title: "",
    author: "",
    publisher: "",
    image: "",
    site: "",
    comment: "",
    date: new Date().getTime(),
    index: bookCount,
    subtitle: "",
  };

  const [inputValues, setInputValues] = useState(sampleObj);
  const navigate = useNavigate();

  const onChange = (event) => {
    const { value, name } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onValid = async ({
    title,
    author,
    publisher,
    image,
    site,
    subtitle,
  }) => {
    console.log(title, author, publisher, image, site, subtitle);
    await setInputValues((prev) => ({
      ...prev,
      title,
      author,
      publisher,
      image,
      site,
      subtitle,
    }));
    if (!isCount) {
      alert("기다려주세요");
    }
    console.log("inputValues", inputValues);
    //await addDoc(collection(dbService, "books"), inputValues);
    await addDoc(collection(dbService, "books"), {
      title,
      author,
      publisher,
      image,
      site,
      comment: "",
      date: new Date().getTime(),
      index: bookCount,
      subtitle: subtitle ? subtitle : "",
    });
    setInputValues(sampleObj);
    //넘어가기
    navigate("/books");
  };

  const getBookCount = async () => {
    const coll = collection(dbService, "books");
    const snapshot = await getCountFromServer(coll);
    console.log("count: ", snapshot.data().count);
    setMyBookCount(snapshot.data().count);
  };

  useEffect(() => {
    getBookCount();
    setInputValues((prevValues) => ({
      ...prevValues,
      index: myBookCount,
    }));
    console.log("!!", inputValues.index);
    console.log("from props bookCount: ", bookCount);
    console.log("from this bookCount: ", myBookCount);
    setIsCount(true);
  }, [myBookCount, inputValues.index]);

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
