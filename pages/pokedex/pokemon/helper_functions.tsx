import Fuse from "fuse.js";
import { getAllPokemons } from "./storage";
import { useMemo } from "react";

export const getPokemonId = (url: string): number => {
  const regexp = /\/\d+/;
  const array = url.match(regexp);
  return Number(array[0].slice(1));
};

//some of the Pokemons had  too long description or description was in other language than english so I needed to extract different description from the object
export const getPokemonDescription = (pokemonId: number): number => {
  const pokemonsIds: number[] = [
    40, 153, 170, 279, 476, 500, 504, 588, 569, 567, 556, 552, 547, 531, 615,
    629, 640, 261, 268, 269, 303, 306, 330, 342, 352, 353, 355, 356, 368, 369,
    371, 373, 376,
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

export const getStatValuePercentage = (
  statName: string,
  statValue: number
): number => {
  let hpMax = 255;
  let atkMax = 190;
  let def_sdef_Max = 230;
  let satkMax = 180;
  let spdMax = 200;

  let maxStatValue:number;

  switch (statName) {
    case "hp":
      maxStatValue = hpMax;
      break;
    case "atk":
      maxStatValue = atkMax;
      break;
    case "def":
    case "sdef":
      maxStatValue = def_sdef_Max;
      break;
    case "satk":
      maxStatValue = satkMax;
      break;
    case "spd":
      maxStatValue = spdMax;
      break;
  }

  return Math.round((statValue * 100) / maxStatValue);
};

export const getPageUrl = (pagenumber: number): string => {
  const pokemonsPerPage: number = 12;
  const apiUrl: string = process.env.NEXT_PUBLIC_API;

  return `${apiUrl}/pokemon?offset=${
    pokemonsPerPage * (pagenumber - 1)
  }&limit=12`;
};

export function getPreviousPage(pagenumber: number): string {
  let previousPage: number = pagenumber - 2;
  let path: string = previousPage > 1 ? `/pokedex/${previousPage}` : `/pokedex`;
  return path;
}

const newFuse = (
  allNames: { name: string; url: string }[],
  options: {
    includeScore: boolean;
    keys: string[];
  }
) => {
  const fuse = useMemo(() => new Fuse(allNames, options), [allNames, options]);

  return { fuse };
};

export const fuzzySearchResults = (
  allNames: { name: string; url: string }[],
  text: string
): any[] => {
  const options = {
    includeScore: true,
    keys: ["name"],
  };

  const fuse = newFuse(allNames, options).fuse;
  return fuse.search(text).slice(0, 3);
};


export async function getAllPokemonsNamesAndIds() {
  const allPokemonsData = await getAllPokemons();
  let allPokemonsNamesAndIds = [];
  const firstPokemonId = 1;
  const lastPokemonId = 648;

  for (let i = 0; i < allPokemonsData.length; i++) {
    allPokemonsNamesAndIds.push(allPokemonsData[i].name);
  }

  for (let i = firstPokemonId; i <= lastPokemonId; i++) {
    allPokemonsNamesAndIds.push(i.toString());
  }

  return allPokemonsNamesAndIds;
}

export const createAnArrayOfAllNamesAndIds = (listOfPokemons) => {
  const minPokemonId: number = 1;
  const maxPokemonId: number = 648;
  const arrayOfAllNames = [];
  for (let name of listOfPokemons) {
    arrayOfAllNames.push(name.name);
  }

  for (let i = minPokemonId; i <= maxPokemonId; i++) {
    arrayOfAllNames.push(i.toString());
  }
  return arrayOfAllNames;
};
