import React from "react";

import ProductList from "../../components/ProductList/ProductList";

const Home = ({ setIsLoggedIn }) => {
  return (
    <div className="Home">
      <ProductList setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default Home;
