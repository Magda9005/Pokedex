import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import textfieldStyle from "../utils/textfieldMuiStyle";
import { fuzzySearchResults } from "../logic/search";
import { useState } from "react";
import { checkIfPokemonNameOrIdExists } from "../logic/data";
import { Dispatch, SetStateAction } from "react";

interface PokemonSearchBarProps {
  allNames: { name: string; url: string }[];
  displayError: boolean;
  handleDisplayError: Dispatch<SetStateAction<boolean>>;
}

const PokemonSearchBar: React.FC<PokemonSearchBarProps> = ({
  allNames,
  displayError,
  handleDisplayError,
}) => {
  const [route, setRoute] = useState<string>();
  const [text, setText] = useState("");

  const handlePokemonSearch = setRoute;

  const handleSubmit = (e: React.SyntheticEvent) => {
    if (
      route == null ||
      !checkIfPokemonNameOrIdExists(allNames, route.toLowerCase())
    ) {
      e.preventDefault();
      return handleDisplayError(true);
    }
    handleDisplayError(false);
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
    <form
      role="form"
      action={!displayError && `/pokemon/${route}`.toLowerCase()}
      method="GET"
      onSubmit={(e) => handleSubmit(e)}
    >
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
