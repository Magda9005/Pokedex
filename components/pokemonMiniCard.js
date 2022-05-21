export const PokemonMiniCard = ({ pokemonId, pokemonName }) => (
  <div className="mini-card-background">
    <div className="mini-card">
      <span className="pokemon-id">#{pokemonId} </span>
      <div className="pokemon-mini-image-container">
        <img
          src={
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/` +
            pokemonId +
            `.svg`
          }
          className="pokemon-img"
        />
      </div>
    </div>
    <div className="mini-card-pokemon-name">{pokemonName}</div>
  </div>
);
