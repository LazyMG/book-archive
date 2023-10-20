import Book from "../components/Book";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const Books = ({ books }) => {
  const sortedBook = books.sort((a, b) => b.index - a.index);

  return (
    <div>
      <Nav />
      <div>
        {sortedBook.map((book) => (
          <Book key={book.id} book={book} />
        ))}
        {console.log(books)}
      </div>
      <Link to="/">
        <button>돌아가기</button>
      </Link>
    </div>
  );
};

export default Books;
