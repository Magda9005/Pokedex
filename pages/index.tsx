import { jsonFetch } from "../logic/fetch";
import { getAllPokemons } from "../logic/fetch";
import { GetServerSideProps } from "next";
import { publicApi } from "../.vscode/functions/env_variables";
import PokemonPage from "../components/PokemonPage";

interface PokemonsPageProps {
  pokemons: { name: string; url: string }[];
  pokemonsWithTypes: any[];
  allNames: { name: string; url: string }[];
}

const PokemonsFirstPage: React.FC<PokemonsPageProps> = ({
  pokemons,
  pokemonsWithTypes,
  allNames,
}) => (
  <PokemonPage
    pageNr={1}
    pokemons={pokemons}
    pokemonsWithTypes={pokemonsWithTypes}
    allNames={allNames}
  />
);

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = publicApi;
  const data = await jsonFetch(`${apiUrl}/pokemon?offset=0&limit=24`);
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

export default PokemonsFirstPage;
