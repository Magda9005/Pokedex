import { storageApi } from "../envVariables";

const cache = {};

interface Response {
  status: number;
  ok?: boolean;
  json?: () => void;
}

export async function getAllPokemons() {
  const { results } = await cachedJsonFetch(storageApi);
  return results;
}

export class RequestFailError extends Error {
  status: number;
  constructor(response: Response) {
    super("Request failed");
    this.status = response.status;
  }
}

export async function cachedJsonFetch(url: string) {
  if (!cache[url]) {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new RequestFailError(response);
    }

    cache[url] = response.json();
  }

  return cache[url];
}

export interface Pokemon {
  name: string;
  url: string;
}

export async function getPokemonsWithTypes(
  pokemons: Pokemon[],
  apiUrl: string
) {
  const pokemonsWithTypes = [];
  for (const { name } of pokemons) {
    const data = await cachedJsonFetch(`${apiUrl}/pokemon/${name}`);
    pokemonsWithTypes.push({ name: data.name, type: data.types[0].type.name });
  }

  return pokemonsWithTypes;
}
