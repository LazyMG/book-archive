import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to="/">
        <button>홈으로</button>
      </Link>
      <Link to="/my">
        <button>책등록</button>
      </Link>
      <Link to="/books">
        <button>책목록</button>
      </Link>
    </div>
  );
};

export default Nav;
