import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import textfieldStyle from "../textfieldMuiStyle";

interface PokemonSearchBarProps {
  result: {
    item: {
      name: string;
    };
  }[];
  route: string | number | null;
  onSubmit: (e: React.SyntheticEvent) => void;
  onChangeAutocomplete: (value: string | number) => void;
  onChangeTextField: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  action: string;
}

const PokemonSearchBar: React.FC<PokemonSearchBarProps> = ({
  result,
  route,
  onSubmit,
  onChangeAutocomplete,
  onChangeTextField,
  action,
}) => {
  return (
    <form role="form" action={action} method="GET" onSubmit={onSubmit}>
      <Stack spacing={2}>
        <Autocomplete
          role="searchbox"
          aria-autocomplete="list"
          id="free-solo-demo"
          filterOptions={(x) => x}
          freeSolo="true"
          options={result.map((r) => {
            return r.item.name[0].toUpperCase() + r.item.name.substring(1);
          })}
          onChange={(e, value) => {
            onChangeAutocomplete(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              aria-placeholder="Pokémon Name or Id"
              label="Pokémon Name or Id"
              style={{ backgroundColor: "white" }}
              value={route}
              size="small"
              sx={textfieldStyle}
              onChange={(e) => {
                onChangeTextField(e);
              }}
            />
          )}
        />
      </Stack>
    </form>
  );
};

export default PokemonSearchBar;
