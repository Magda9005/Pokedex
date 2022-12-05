import { getStatValuePercentage } from "../components/StatSlider";

test('should return 20 if stats name is "hp" and the stats value is 51', () => {
  expect(getStatValuePercentage("hp", 51)).toBe(20);
});

test('should return 50 if stats name is "def" and the stats value is 115', () => {
  expect(getStatValuePercentage("def", 115)).toBe(50);
});
