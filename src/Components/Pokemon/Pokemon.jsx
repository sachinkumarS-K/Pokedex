import React from "react";
import './Pokemon.css'
import { NavLink } from "react-router-dom";
function Pokemon({ name, img , id }) {
  return (
    <div className="pokemonCard">
      <div className="pokemonName">{name} </div>
      <NavLink to= {`/pokemon/${id}`}>
      <div className="pokemonImage">
        <img src={img} alt="pokemonImagae" loading="lazy" />
      </div>
     </NavLink>
    </div>
  );
}

export default Pokemon;
