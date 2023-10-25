import React from "react";
import useGetCount from "../lib/useGetCount";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Profile = () => {
  const { bookCount } = useGetCount();
  return (
    <>
      <Nav />
      <div>Profile</div>
      <div>{bookCount}</div>
      <Footer />
    </>
  );
};

export default Profile;
