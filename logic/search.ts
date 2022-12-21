import Fuse from "fuse.js";
import { useMemo } from "react";

const useNewFuse = (allNames, options) => {
  const fuse = useMemo(() => new Fuse(allNames, options), [allNames, options]);

  return { fuse };
};

export const fuzzySearchResults = (
  allNames: { name: string; url: string }[],
  text: string
): any[] => {
  const options = {
    includeScore: true,
    keys: ["name"],
  };

  const fuse = useNewFuse(allNames, options).fuse;
  return fuse.search(text).slice(0, 3);
};
