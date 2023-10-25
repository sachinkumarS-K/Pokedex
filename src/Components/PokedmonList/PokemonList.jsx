import React from "react";
import "./PokemonList.css";

import Loader from "../Loader/Loader";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
  const {  pokemonListState,setPokemonListState } = usePokemonList();
  return (
    <div className="pokemon-wrapper">
      {pokemonListState.loading ? (
        <Loader />
      ) : (
        pokemonListState.data.map((p) => (
          <Pokemon name={p.name} img={p.image} key={p.id} id={p.id} />
        ))
      )}
      <div className="btns">
        {pokemonListState.preUrl !== null ? (
          <button
            onClick={() =>
              setPokemonListState((pre) => ({
                ...pre,
                url: pokemonListState.preUrl,
              }))
            }
          >
            Previous
          </button>
        ) : (
          ""
        )}
        {pokemonListState.nextUrl !== null ? (
          <button
            onClick={() =>
              setPokemonListState((pre) => ({
                ...pre,
                url: pokemonListState.nextUrl,
              }))
            }
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PokemonList;
