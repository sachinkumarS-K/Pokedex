import React, { useEffect } from "react";
import "./DetailPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import Pokemon from "../Pokemon/Pokemon";
import Loader from "../Loader/Loader";

function DetailsPage({pokemonName , setSearch}) {
  const { id } = useParams();
 // console.log(id)
  const navigate = useNavigate();
 
  const { data , detailData ,   loading, setLoading , tag } = usePokemonDetails(id , pokemonName);
 
  return (
    <div className="detailPageWrapper">
     
      <div className="heading">
       
        <AiOutlineArrowLeft fontSize={30} onClick={() => {
          setSearch ? ( setSearch('')) : (navigate(-1))
          }} />
        
        <h1>
          <Link to="/">Pokedex</Link>
        </h1>
      </div>
      {
        loading ? (<div className="loaderDetail">  <Loader /> </div>) : ( <img src={data.image} alt="" />)
      }
     
      <div className="pokemonTitle">
        Name : <span>{data.name}</span>
      </div>

      <div className="height">Height : {data.height}</div>
      <div className="weight">Weight : {data.weight} </div>
      <div className="typeCont">
        {data.types && data.types.map((t, idx) => <div key={idx}>{t}</div>)}
      </div>
      {
        loading ? (
          <div className="bottom-loader">
             <br/>
            <Loader />
           
            <p className="loaderPara">Loading more pokemons...</p>
          </div>
        ) : (
          <div className="morePokemons">
          <p className="morePokemon">{`More ${tag} type Pokemon`}</p>
          <div className="detailPokemons">
          {
            detailData.map(p => (
              <Pokemon name={p.name} img={p.image} key={p.id} id={p.id}/>
            ))
          }
         </div>

          </div>
        )
      }
     
       
     
    </div>
  );
}

export default DetailsPage;
