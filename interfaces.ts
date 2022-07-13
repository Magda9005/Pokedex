import { Dispatch, SetStateAction } from "react";

export interface PokemonsPageProps {
  pokemons: { name: string; url: string }[];
  pokemonsWithTypes: any[];
  allNames: { name: string; url: string }[];
}

export interface PokemonProps {
  pokemonsCharacteristic: {
    forms: {
      url: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
    };
    name: string;
    weight: number;
    height: number;
    abilities: {
      name: string;
      ability: {
        name: string;
      };
    }[];
  };
  pokemonsDescriptionText: {
    flavor_text_entries: {
      flavor_text: string;
    };
  };
}

export interface MiniCardProps {
  pokemon: {
    name: string;
  };
  pokemonId: number;
  pokemonImage: string;
  pokemonName: string;
  pokemonsNamesAndTypes: any;
}

export interface PokemonsListProps {
  result: { item: { name: string; url: string } }[];
  route: string | number;
  onSubmit: (e: React.SyntheticEvent) => void;
  onChangeAutocomplete: Dispatch<SetStateAction<string | number>>;
  onChangeTextField: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  action: string;
  displayError: boolean;
  listElements: JSX.Element[];
  url: string;
  pageNumber: number;
  nextPage: string;
}

export interface PokemonSearchProps {
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

export interface StatsSliderProps {
  statName: string;
  statValue: number;
  pokemonType: string;
}
