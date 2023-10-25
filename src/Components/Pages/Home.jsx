import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import './Home.css'
import PokemonList from '../PokedmonList/PokemonList'

import { Link } from 'react-router-dom'
import DetailsPage from './DetailsPage'
function Home() {
    const [search , setSearch] = useState(null)
    const[inpData  , setInpData] = useState('')
  return (
    <div className='pokedexWrapper'>
       {(!search) ? (<h1><Link to= "/">Pokedex</Link></h1>) : "" }  
      <Search updateSearch = {setSearch} search = {search} />
      {
        (!search) ? <PokemonList/> : <DetailsPage key={search} pokemonName={search} setSearch = {setSearch} />
      }
    </div>
  )
}

export default Home
