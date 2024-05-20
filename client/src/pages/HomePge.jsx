import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";

const HomePge = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
    </>
  );
};

export default HomePge;
