import Fuse from "fuse.js";
import { useMemo } from "react";

const useNewFuse = (
  allNames: { name: string; url: string }[],
  options: {
    includeScore: boolean;
    keys: string[];
  }
) => {
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


const values=<T,U>(arg1:T,arg2:U)=>{
  return{
    value1:arg1,
    value2:arg2
  }
}

const getValues=values('a',2)