import { storageApi } from "./env_variables";

let storage = null;

export async function getAllPokemons() {
  if (storage) {
    return storage;
  } else {
    const response = await fetch(storageApi);
    const { results } = await response.json();
    storage = results;
    return storage;
  }
}

