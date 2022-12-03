import { publicApi } from "../envVariables";
import { pokemonsPerPage } from "../constants";

export const getPageUrl = (pagenumber: number): string => {
  const apiUrl: string = publicApi;

  return `${apiUrl}/pokemon?offset=${pokemonsPerPage * (pagenumber - 1)
    }&limit=${pokemonsPerPage}`;
};

export function getPreviousPage(pagenumber: number): string {
  let previousPage: number = pagenumber - 1;
  let path: string = previousPage > 1 ? `/${previousPage}` : `/`;
  return path;
}
