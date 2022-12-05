import { checkIfPokemonNameOrIdExists } from "../logic/data";

const pokemonsNamesAndIds = [
  { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
  { name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2" },
  { name: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3" },
  { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
];

test("should return true if the array includes given pokemon's name", () => {
  expect(checkIfPokemonNameOrIdExists(pokemonsNamesAndIds, "Venusaur")).toBe(
    true
  );
});

test("should return false if the array doesn't include given pokemon's name", () => {
  expect(checkIfPokemonNameOrIdExists(pokemonsNamesAndIds, "Pikachu")).toBe(
    false
  );
});

test("should return true if the array includes given pokemon's id", () => {
  expect(checkIfPokemonNameOrIdExists(pokemonsNamesAndIds, "4")).toBe(true);
});

test("should return false if the array doesn't include given pokemon's id", () => {
  expect(checkIfPokemonNameOrIdExists(pokemonsNamesAndIds, "10")).toBe(false);
});
