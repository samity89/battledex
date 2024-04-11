function PokemonDetails ( {mon} ) {
  const titleCase = (str) => {
    var splitStr = str.toLowerCase().replace("-", " ").split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).replace("-", " ");     
    }
    return splitStr.join(' '); 
  }  
  const renderMoves = mon.moves.map((move) => {
    return (
      <p>{titleCase(move.move.name.replace("-", " "))}</p>
    )
  })
  const types = mon.types.map((type) => titleCase(type.type.name))
  const abilities = mon.abilities.map((ability) => titleCase(ability.ability.name))
  const renderStats = mon.stats.map((stat) => {
    return (
      <div>
        <p>{titleCase(stat.stat.name.replace("-", " "))}: {stat.base_stat}</p>
      </div>
    )
  })

  return (
    <div className="card" key={mon.name}>
      <img src={mon.sprites.other.home.front_default} alt={mon.name}/>
      <h4>{titleCase(mon.name)}</h4>
      <h5>Type: {types.join('/')}</h5>
      <h5>Dex #{mon.id}</h5>
      <h5>Abilities: {abilities.join('/')}</h5>
      {renderStats}
      <h5><u>Moves</u></h5>
      {renderMoves}
    </div>
  )
}

export default PokemonDetails;