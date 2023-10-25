import axios from "axios";
import { useState, useEffect } from "react";

export default function usePokemonList() {

    const [pokemonListState, setPokemonListState] = useState({
        data: [],
        loading: false,
        url: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        preUrl: ''
    });
    
    async function fetchData() {
        setPokemonListState((pre) => ({ ...pre, loading: true }))
        const response = await axios.get(pokemonListState.url);
        console.log(response.data);
        const pokemonResult = response.data.results;
        setPokemonListState(pre => (
            {
                ...pre,
                nextUrl: response.data.next,
                preUrl: response.data.previous
            }
        ));
     
        
        const pokemonPromise = pokemonResult.map((pokemon) =>
            axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonPromise);
     
        console.log(pokemonData);
        const info = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other
                    ? pokemon.sprites.other.dream_world.front_default
                    : pokemon.sprites.front_shiny,
                types: pokemon.types,
            };
        });
        
        setPokemonListState((pre) => ({ ...pre, data: info }))
        console.log(info);
        setPokemonListState((pre) => ({ ...pre, loading: false }))
    }
    
    useEffect(() => {
        fetchData();
    }, [pokemonListState.url]);
    
    return {
        pokemonListState,
        setPokemonListState
    }
}
