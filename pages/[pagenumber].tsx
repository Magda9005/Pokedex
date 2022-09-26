import { useRouter } from "next/router";
import { getPageUrl, getPreviousPage } from "../logic/urls";
import { jsonFetch } from "../logic/fetch";
import { getAllPokemons } from "../logic/fetch";
import { GetServerSideProps } from "next";
import { publicApi } from "../.vscode/functions/env_variables";
import { lastAccessiblePage } from "../constants";
import PokemonPage from "../components/PokemonPage";

interface PokemonsPageProps {
  pokemons: { name: string; url: string }[];
  pokemonsWithTypes: any[];
  allNames: { name: string; url: string }[];
}

const PokemonsPage: React.FC<PokemonsPageProps> = ({
  pokemons,
  pokemonsWithTypes,
  allNames,
}) => {
  const router = useRouter();

  return (
    <PokemonPage
      pageNr={router.query.pagenumber}
      pokemons={pokemons}
      pokemonsWithTypes={pokemonsWithTypes}
      allNames={allNames}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pagenumber: any = context.params.pagenumber;
  const apiUrl = publicApi;

  if (pagenumber > lastAccessiblePage) {
    return {
      notFound: true,
    };
  }
  let URL = getPageUrl(pagenumber);
  const data = await jsonFetch(URL);
  const pokemons = data.results;
  const allNames = await getAllPokemons();

  const pokemonsWithTypes = [];
  for (const { name } of pokemons) {
    const data = await jsonFetch(`${apiUrl}/pokemon/${name}`);
    pokemonsWithTypes.push(data);
  }

  return {
    props: {
      pokemons,
      pokemonsWithTypes,
      allNames,
    },
  };
};

export default PokemonsPage;
