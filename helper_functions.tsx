import Fuse from "fuse.js";
import { getAllPokemons } from "./storage";
import { useMemo } from "react";
import { publicApi } from "./.vscode/functions/env_variables";

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
  const maxValues = {
    hp: 255,
    atk: 190,
    def: 230,
    sdef: 230,
    satk: 180,
    spd: 200,
  };

  let maxStatValue: number = maxValues[statName];

  return Math.round((statValue * 100) / maxStatValue);
};

export const getPageUrl = (pagenumber: number): string => {
  const pokemonsPerPage: number = 24;
  const apiUrl: string = publicApi;

  return `${apiUrl}/pokemon?offset=${
    pokemonsPerPage * (pagenumber - 1)
  }&limit=24`;
};

export function getPreviousPage(pagenumber: number): string {
  let previousPage: number = pagenumber - 2;
  let path: string = previousPage > 1 ? `/${previousPage}` : `/`;
  return path;
}

const useNewFuse = (
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

  const fuse = useNewFuse(allNames, options).fuse;
  console.log(fuse.search(text).slice(0, 3));
  return fuse.search(text).slice(0, 3);
};

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

export async function getAllPokemonsNamesAndIds() {
  const allPokemonsData = await getAllPokemons();

  return createAnArrayOfAllNamesAndIds(allPokemonsData);
}

export async function jsonFetch(URL: string) {
  return await fetch(URL).then((response) => response.json());
}
