import React, { useState, useEffect, Suspense } from 'react';
import PokedexDisplay from './PokedexDisplay';
import PokemonDetails from './PokemonDetails';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchPokemon()
  },[])

  async function fetchPokemon () {
    const promises = [];
    for (let i = 1; i <= 1025; i++ ) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((response) => response.json()));
    }
    Promise.all(promises).then((results) => setPokemon(results))
  }
  
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  const filteredPokemon = pokemon.filter((mon) => {
    if (searchInput === "") return pokemon
    else return mon.name.toLowerCase().includes(searchInput.toLowerCase())
  })

  const renderPokemon = filteredPokemon.map((mon) => {
    return (
      <PokedexDisplay mon={mon} key={mon.name} setSelectedPokemon={setSelectedPokemon}/>
    )
  })

  
  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <h1 onClick={()=>{setSelectedPokemon(null); setSearchInput("")}}>BATTLEDEX</h1>
        <input
          type="text"
          placeholder="Search here"
          onChange={handleSearchChange}
          value={searchInput} 
        />
          <div>
            {selectedPokemon ? (<PokemonDetails mon={selectedPokemon} key={selectedPokemon.name}/>) : (
            <div className="card_container">
            {renderPokemon} 
            </div>)}
        </div>
        <button onClick={()=>console.log(pokemon)}>log Pokemon</button>
      </div>
    </Suspense>
    </ErrorBoundary>
  );
}
  
export default App;
