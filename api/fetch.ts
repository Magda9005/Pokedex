import { storageApi } from "../env_variables";

let storage = null;

interface Response {
  status: number;
  ok?: boolean;
  json?: () => void;
}

export async function getAllPokemons() {
  if (storage) {
    return storage;
  } else {
    const { results } = await cachedJsonFetch(storageApi);
    storage = results;
    return storage;
  }
}

export class RequestFailError extends Error {
  constructor(response: Response) {
    super(response.status);
    this.message = response.status;
  }
}

const cache = {};

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
    pokemonsWithTypes.push(data);
  }

  return pokemonsWithTypes;
}
