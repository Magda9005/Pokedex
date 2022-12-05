import { getPreviousPage } from "../logic/urls";

test('should return "/" if page number less than or equal 1', () => {
  expect(getPreviousPage(1)).toBe("/");
});

test("should return correct number of previous page if pagenumber is greater than 1 ", () => {
  expect(getPreviousPage(3)).toBe("/2");
});
