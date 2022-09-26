import { storageApi } from "../.vscode/functions/env_variables";

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

export class RequestFailError extends Error {
  constructor(response) {
    super(response.status);
    this.message = response.status;
  }
}

export async function jsonFetch(URL: string) {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new RequestFailError(response);
  }

  return response.json();
}
