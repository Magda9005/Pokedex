export const getPokemonId = (url: string): number => {
  const regexp = /\/\d+/;
  const array = url.match(regexp);
  return Number(array[0].slice(1));
};

//some of the Pokemons had  too long description or description was in other language than english so I needed to extract different description from the object
export const getProperPokemonId = (pokemonId: number): number => {
  const pokemonsIds: number[] = [
    41, 33, 40, 45, 71, 79, 153, 170, 279, 476, 500, 504, 588, 569, 567, 556,
    552, 547, 531, 615, 629, 640, 261, 268, 269, 303, 306, 330, 342, 352, 353,
    355, 356, 368, 369, 371, 373, 376,
  ];
  let id: number = 1;

  if (pokemonId == 601 || pokemonId == 619) {
    id = 3;
  }
  if (pokemonsIds.includes(pokemonId)) {
    id = 2;
  }

  return id;
};
