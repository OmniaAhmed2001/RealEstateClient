import React, { useState } from "react";

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  return (
    <div style={{minHeight: "100vh"}}>
      {favoriteItems.length === 0 ? (
        <p>You haven't chosen your favorite estate yet.</p>
      ) : (
        <div>
          <p>Favorite Items:</p>
          <ul>
            {favoriteItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
