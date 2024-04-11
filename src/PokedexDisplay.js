function PokedexDisplay ( {mon, setSelectedPokemon} ) {
    const titleCase = (str) => {
        var splitStr = str.toLowerCase().replace("-", " ").split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).replace("-", " ");     
        }
        return splitStr.join(' '); 
    }
    
    return (
        <div className="card" onClick={()=>setSelectedPokemon(mon)}>
            <img src={mon.sprites.other.home.front_default} alt={mon.name}/>
            <h4>{titleCase(mon.name)}</h4>
            <p>#{mon.id}</p>
        </div>
    )
}

export default PokedexDisplay;