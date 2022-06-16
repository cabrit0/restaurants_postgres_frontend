import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  console.log(id);

  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRestaurants = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    console.log(updatedRestaurants.data.data);
    navigate("/");
  };

  const handleBack = () => {
    navigate(`/`);
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="Location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="Price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary mx-2 my-4"
        >
          Submit
        </button>
        <button onClick={handleBack} className="btn btn-danger mx-2 my-4">
          Back
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
