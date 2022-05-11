import Fuse from 'fuse.js';
import { getAllPokemons } from './storage';

export const getPokemonId=(url:string):number=>{
    const regexp=/\/\d+/;
    const array=url.match(regexp);
    return Number(array[0].slice(1))
}

//some of the Pokemons had  too long description or description was in other language than english so I needed to extract different description from the object
export const getPokemonDescription=(pokemonId:number):number=>{
    const ids:number[]=[40,153,170,279,476,500,504,588,569,567,556,552,547,531,
        601,615,619,629,640,261,268,269,303,306,330,342,352,353,355,356,368,369,371,373,376]
    let id:number;

    if(pokemonId==601 || pokemonId==619){
        return id=3
    }

    for(let i=0;i<ids.length;i++){
        if(pokemonId==ids[i]){
           return id=2
        }else {
            id=1
        }
    }
    return id
}

export const countStats=(maxStat:number,statValue:number):number=>Math.round(statValue*100/maxStat)

export const getPageUrl=(pagenumber:number):string=>{
    const pokemonsPerPage:number=12;
    const apiUrl:string=process.env.NEXT_PUBLIC_API

    return `${apiUrl}/pokemon?offset=${pokemonsPerPage*(pagenumber-1)}&limit=12`
}

     
export function getPreviousPage(pagenumber:number):string{
    let previousPage:number=pagenumber-2;
    let path:string=previousPage>1?`/pokedex/${previousPage}`:`/pokedex`;
    return path
    }

export const fuzzySearchResults=(allNames:{name:string,url:string}[],text:string):any[]=>{
    const options={
        includeScore:true,
        keys: ['name']
    }

    const fuse=new Fuse(allNames,options)
    console.log(fuse.search(text).slice(0,3))
    return fuse.search(text).slice(0,3)
}


export async function getAllPokemonsNamesAndIds(){
    const allPokemonsData=await getAllPokemons();
    let allPokemonsNamesAndIds=[];
    const firstPokemonId=1;
    const lastPokemonId=648;

for(let i=0;i<allPokemonsData.length;i++){
    allPokemonsNamesAndIds.push(allPokemonsData[i].name)
}

for(let i=firstPokemonId;i<=lastPokemonId;i++){
    allPokemonsNamesAndIds.push(i.toString())
}

return allPokemonsNamesAndIds;
}


// export async function getPokemonsTypes(pokemonNamesList){
//     const pokemonsArray:any[]=[];
//     const apiUrl:string=process.env.NEXT_PUBLIC_API;
//     for (let i=0;i<pokemonNamesList.length; i++){
//         const response=await fetch(`${apiUrl}/pokemon/${pokemonNamesList[i]}`);
//         const data=await response.json();
//         pokemonsArray.push(data);
//     }

//     return pokemonsArray;
// }