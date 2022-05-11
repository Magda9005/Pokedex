import Link from 'next/link';
import {getPokemonId,fuzzySearchResults} from './pokemon/helper_functions';
import {getAllPokemons} from './pokemon/storage';
import React, { useState,useEffect } from 'react';
import {useRouter} from 'next/router';
import { useCookie } from 'react-use';
import SearchForPokemon from './pokemon/SearchComponent';
import MiniCard from './pokemon/MiniCard';
import { GetServerSideProps } from 'next';
import Image from 'next/image';


interface PokemonsListFirstPage {
pokemons:{name:string,url:string}[],
pokemonsTypes:any[],
allNames:{name:string,url:string}[],
}

 const PokemonsListFirstPage: React.FC<PokemonsListFirstPage>=({pokemons,pokemonsTypes,allNames})=>{
    const [page,updateCookie]=useCookie('pageNumber');
    const [text,setText]=useState('')
    const router=useRouter();
    const [route,setRoute]=useState<string|number>();
    const [displayError,setDisplayError]=useState(false);
    const pokemonImage:string=process.env.NEXT_PUBLIC_POKEMON_IMG
    const pokemonsNamesAndTypes={};
    for(let i=0;i<pokemonsTypes.length;i++){
        pokemonsNamesAndTypes[pokemonsTypes[i].name]=pokemonsTypes[i].types[0].type.name
    }

    const pagenumber=1;
    
    useEffect(() => {
        updateCookie(pagenumber);
      }, );

      const handlePokemonSearch=(value:string|number)=>{
        setRoute(value);
    }

    const handleOnChangeTextField=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        if(e.target.value==""){
            setDisplayError(false);
                         }
            setText(e.target.value);
    }


    const handleSubmit=(e:React.SyntheticEvent)=>{
        const minPokemonId:number=1;
        const maxPokemonId:number=648;

         e.preventDefault();
            if(route==null){
               return setDisplayError(true);
            }
            if(route>=minPokemonId && route<=maxPokemonId){
                setDisplayError(false);
                return router.push(`/pokedex/pokemon/${route}`);
            }

            for(let i=0;i<allNames.length;i++){
                if(allNames[i].name==route.toLowerCase()){
                    setDisplayError(false);
                    router.push(`/pokedex/pokemon/${route}`.toLowerCase());
                    return;
                } 
            }
            setDisplayError(true)
    }

  
   
    const pokemonsList=pokemons.map(pokemon=>{
    const pokemonName:string=pokemon.name[0].toUpperCase()+pokemon.name.substring(1);  
        const pokemonId:number=getPokemonId(pokemon.url)
        return(
    <MiniCard pokemon={pokemon} pokemonId={pokemonId} pokemonImage={pokemonImage} pokemonName={pokemonName} pokemonsNamesAndTypes={pokemonsNamesAndTypes}/>
        )
    }
        )
    return(
        <div className="pokemon-list-container">
        <div className="pokedex-title">
<Image src='/pokeball-main-page.svg' alt='pokeball-logo' priority='true' width='328' height='32'/>
        </div>
        <SearchForPokemon result={fuzzySearchResults(allNames,text)} route={route} onSubmit={handleSubmit}
         onChangeAutocomplete={handlePokemonSearch}
        onChangeTextField={handleOnChangeTextField}/>
      <div className="pokemon-cards-container">
      {displayError && <div className="error-message"> Sorry, no Pokémon matched your search!</div>}
   {pokemonsList}   
      </div>
     <div className="next-btn-area">
      <Link href={`/pokedex/${page+1}`} role="link"><button role="button" className='btn-next-prev'> <img src='/chevron-right-black.svg' className="next-icon"/> </button></Link>
</div>   
</div> )
}



 export const getServerSideProps:GetServerSideProps=async()=>{
     const apiUrl=process.env.NEXT_PUBLIC_API;
        const response=await fetch(`${apiUrl}/pokemon?offset=0&limit=12`);
        const data=await response.json();
        const pokemons=data.results;
        const allNames=await getAllPokemons();
        
        const pokemonNamesList=[];
        for(let i=0;i<pokemons.length;i++){
            pokemonNamesList.push(pokemons[i].name)
        }

        const pokemonsTypes=[];
    for (let i=0;i<pokemonNamesList.length; i++){
            const response=await fetch(`${apiUrl}/pokemon/${pokemonNamesList[i]}`);
            const data=await response.json();
            pokemonsTypes.push(data); 
    }
       
    if(!data){
        return{
            notFound:true,
        }
    }

        return {
                    props:{
                        pokemons,
                        pokemonsTypes,
                        allNames,
                    },
                    
                }
            }

export default PokemonsListFirstPage