import { categories } from "../data";
import "../styles/Listings.scss";
import Loader from "./Loader";
import ListingsCard from '../components/ListingsCard';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispach = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `/api/properties?category=${selectedCategory}`
          : `/api/properties`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispach(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log(`Fetch listing failed`, error);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
            }, index) => (
              <ListingsCard
                key={index}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
