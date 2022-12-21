import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect } from "react";
import textfieldStyle from "../utils/textfieldMuiStyle";
import { fuzzySearchResults } from "../logic/search";
import { useState } from "react";
import { checkIfPokemonNameOrIdExists } from "../logic/data";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

interface PokemonSearchBarProps {
  allNames: { name: string; url: string }[];
  displayError: boolean;
  handleDisplayError: Dispatch<SetStateAction<boolean>>;
}

const PokemonSearchBar: React.FC<PokemonSearchBarProps> = ({
  allNames,
  handleDisplayError,
}) => {
  const [pokemonSelected, setPokemonSelected] = useState<string>();
  const [text, setText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (pokemonSelected !== undefined) {
      router.push(`/pokemon/${pokemonSelected}`.toLowerCase());
    }
  }, [pokemonSelected]);

  const handlePokemonSearch = setPokemonSelected;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      pokemonSelected == null ||
      !checkIfPokemonNameOrIdExists(allNames, pokemonSelected.toLowerCase())
    ) {
      return handleDisplayError(true);
    }
    handleDisplayError(false);
    router.push(`/pokemon/${pokemonSelected}`.toLowerCase());
  };

  const handleOnChangeTextField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value === "") {
      handleDisplayError(false);
    }
    setText(e.target.value);
  };

  return (
    <form role="form" onSubmit={(e) => handleSubmit(e)}>
      <Autocomplete
        role="searchbox"
        aria-autocomplete="list"
        id="free-solo-demo"
        filterOptions={(x) => x}
        freeSolo={true}
        options={fuzzySearchResults(allNames, text).map((r) => {
          return r.item.name[0].toUpperCase() + r.item.name.substring(1);
        })}
        onChange={(e, value) => {
          handlePokemonSearch(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            aria-placeholder="Pokémon Name or Id"
            label="Pokémon Name or Id"
            style={{ backgroundColor: "white" }}
            size="small"
            sx={textfieldStyle}
            onChange={(e) => {
              handleOnChangeTextField(e);
            }}
          />
        )}
      />
    </form>
  );
};

export default PokemonSearchBar;
