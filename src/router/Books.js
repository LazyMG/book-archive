import Book from "../components/Book";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import useGetBooks from "../lib/useGetBooks";
import Loading from "../components/Loading";

const Books = () => {
  const { books, load } = useGetBooks();

  return (
    <div>
      <Nav />
      {!load ? (
        <div>
          {books
            .sort((a, b) => b.index - a.index)
            .map((book) => (
              <Book key={book.id} book={book} />
            ))}
          {console.log(books)}
        </div>
      ) : (
        <Loading />
      )}
      <Link to="/">
        <button>돌아가기</button>
      </Link>
    </div>
  );
};

export default Books;
