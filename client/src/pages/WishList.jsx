import Navbar from '../components/Navbar';
import ListingsCard from '../components/ListingsCard';
import { useSelector } from 'react-redux';
import '../styles/Listings.scss';
const WishList = () => {
    const wishList = useSelector((state) => state.user.wishList);
  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.map(
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
            booking = false,
          }, index) => (
            <ListingsCard key={index}
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
    </>
  )
}

export default WishList;
