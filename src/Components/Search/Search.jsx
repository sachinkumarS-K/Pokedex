import React, { useState } from 'react'
import './Search.css'
import { useDebounce } from '../../hooks/useDebouce'
function Search({updateSearch , search}) {
  const debounceCallback = useDebounce((e) =>updateSearch(e.target.value.toLowerCase()));
  const [inp, setInp] = useState('');
  function changehandler(e) {
    
    
  }
  return (
    <div className='searchWrapper'>
      <input id='pokemonNameSearch' onChange={debounceCallback} type='text' placeholder='Pokemon Name.......' />
    </div>
  )
}

export default Search
