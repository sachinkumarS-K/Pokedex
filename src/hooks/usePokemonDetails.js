import axios from "axios";
import { useState, useEffect } from "react";

export default function usePokemonDetails(id , pokemonName) {
    const [data, setData] = useState({});
    const [detailData, setDetailData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState('');
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`)
    //console.log(`https://pokeapi.co/api/v2/pokemon/${id}`)
    async function fetchData() {
      setLoading(true);
      let response;
      if (pokemonName) {
        console.log(pokemonName)
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      } else {
        console.log('by id')
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
     
    console.log("response", response);
    const pokemonOfSameType = await axios.get(
      `https://pokeapi.co/api/v2/type/${
        response.data.types ? response.data.types[0].type.name : ""
      }`
        );
       setTag(response.data.types[0].type.name)
    console.log("sachin", pokemonOfSameType);
      
      const pd = pokemonOfSameType.data.pokemon.slice(10,20 ).map(p => axios.get(p.pokemon.url) );
        const pokemonData = await axios.all(pd);
        console.log('pokedata' , pokemonData)
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
      
      console.log(info)
      setDetailData(info)
        setData({
        name: response.data.name,
        image: response.data.sprites.other
            ? response.data.sprites.other.dream_world.front_default
            : response.data.sprites.front_shiny,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemon: pokemonOfSameType.data.pokemon.slice(5, 10),
       
        });
    setLoading(false)
  }
    //  const tags = data.types;
    //  console.log(tags)
    
    useEffect(() => {
        fetchData();
    }, [url , id]);

    return {
        data,
        detailData,
        loading,
        setLoading,
        tag
    };
}
