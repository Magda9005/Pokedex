import { getProperDescriptionOfPokemon } from "../logic/data";

test("should return two if the array includes given Pokemon id", () => {
  expect(getProperDescriptionOfPokemon(45)).toEqual(2);
});

test("should return three if the Pokemon id is equal to 601", () => {
  expect(getProperDescriptionOfPokemon(601)).toEqual(3);
});

test("should return one if the array doesn't include given Pokemon id", () => {
  expect(getProperDescriptionOfPokemon(5)).toEqual(1);
});
