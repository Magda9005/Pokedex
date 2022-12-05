import { getPokemonId } from "../logic/data";

test("should return one digit id of the Pokemon", () => {
  expect(getPokemonId("https://pokeapi.co/api/v2/pokemon/4")).toBe(4);
});

test("should return two digits id of the Pokemon", () => {
  expect(getPokemonId("https://pokeapi.co/api/v2/pokemon/40")).toBe(40);
});

test("should return three digits id of the Pokemon", () => {
  expect(getPokemonId("https://pokeapi.co/api/v2/pokemon/400")).toBe(400);
});
