import React from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <h4>
      <Link to={`/books/${book.id}`}>{book.title}</Link>
      <img alt="img" src={book.image} />
      <ul>
        <li>작가: {book.author}</li>
        <li>출판사: {book.publisher}</li>
        <li>
          <a href={book.site}>구매 링크</a>
        </li>
      </ul>
    </h4>
  );
};

export default Book;
