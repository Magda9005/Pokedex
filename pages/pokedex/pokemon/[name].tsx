import {getPokemonId,countStats,getPokemonDescription,getAllPokemonsNamesAndIds} from './helper_functions';
import Link from 'next/link';
import { useCookie } from 'react-use';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

interface Pokemon {
    data:{forms:{
        url:string
    },
    types:{
        type:{
            name:string
        }
    }[],
    stats:{
        base_stat:number
    }
    name: string,
    weight:number,
    height:number,
    abilities:{
        name:string,
        ability:{
            name:string
        }
    }[],
    
},
    data2:{flavor_text_entries:{
        flavor_text:string
    }},
}

 const Pokemon:React.FC<Pokemon>=({data,data2})=>{
    const [value]=useCookie('pageNumber');
    const pokemonId=getPokemonId(data.forms[0].url);
    let page=value=='1'? `/pokedex`:`/pokedex/${value}`

    const stats={
        hp:data.stats[0].base_stat,
        hpMax:255,
        atk:data.stats[1].base_stat,
        atkMax:190,
        def:data.stats[2].base_stat,
        defMax:230,
        satk:data.stats[3].base_stat,
        satkMax:180,
        sdef:data.stats[4].base_stat,
        sdefMax:230,
        spd:data.stats[5].base_stat,
        spdMax:200,

    }
    const pokemonImage:string=process.env.NEXT_PUBLIC_POKEMON_IMG

    const pokemonName=data.name[0].toUpperCase()+data.name.substring(1);
    const weight=data.weight/10
    const height=data.height/10
    const quantityOfAbilitiesToBeDisplayed:number=2
    const abilities=data.abilities.map((ability,index)=>{
        if(index<quantityOfAbilitiesToBeDisplayed){
            return(
<span key={ability.name} className="about-parameter">
{ability.ability.name}
        </span>
            )
        }
    }
        )

    const categories=data.types.map(type=>
        <div className={`type`+` `+`bgc-`+type.type.name} key={type.type.name}>
            {type.type.name}
        </div> )
   

    return(
    <div className={`card`+` `+`bgc-`+data.types[0].type.name}>     
       <div className="pokemon-name"><div className="name">
       <Link href={page} role="link">
           <button role="button" className="arrow-left"></button>
           </Link> {pokemonName} </div>
       <span># {pokemonId}</span>
</div>
<div className='pokeball-container'>
<Image src='/pokeball.svg' alt='pokeball' width='208' height='208'/>
</div>
<div className='image-container'>
<Image src={`${pokemonImage}`+pokemonId+`.svg`} width='200' height='200' alt={data.name}/>
</div>
<div className="chevrons-container">    
<Link href={`${pokemonId-1}`} role="link">
    <button role="button" className="chevron-left chevron-card" disabled={pokemonId<2}></button>
  </Link>

    <Link href={`${pokemonId+1}`} role="link">
        <button role="button" className="chevron-right chevron-card" disabled={pokemonId>647}></button>
</Link>

</div>
<div className="parameters-container">
<div className="type-container">
        {categories}
</div>
<div className="about-section">
    <p className={data.types[0].type.name}>About</p>
    <div className="about-parameters">
        <div className="weight-container">
        <div className="weight">
        <span className="about-header">Weight</span>
           <span className="about-parameter"><img src='/scale.svg' alt="scale icon" className="scale-icon"/> {weight} kg</span> 
        </div>
        </div>
        <div className="height-container">
        <div className="height">
        <span className="about-header">Height</span>
           <span className="about-parameter"><img src='/ruler.svg' alt="ruler icon" className="ruler-icon"/>{height} m</span> 
        </div>
        </div>
        <div className="moves-container">
        <div className="moves">
        <span className="about-header">Moves</span>
           {abilities}
        </div>
        </div>
    </div>
</div>
<div className="pokemon-description">
{data2.flavor_text_entries[getPokemonDescription(pokemonId)].flavor_text}
</div>
<div className="base-stats-container">
    <div className="base-stats-header">
<p className={data.types[0].type.name}>Base stats </p>
    </div>
<div className="base-stats-parameters">
    <div className={data.types[0].type.name+` base-stat-name`}>
        <span>HP</span>
        <span>ATK</span>
        <span>DEF</span>
        <span>SATK</span>
        <span>SDEF</span>
        <span>SPD</span>
    </div>
    </div>
    <div className="base-stats-parameters">
    <div className="base-stat-score">
        <span>{stats.hp}</span>
        <span>{stats.atk}</span>
        <span>{stats.def}</span>
        <span>{stats.satk}</span>
        <span>{stats.sdef}</span>
        <span>{stats.spd}</span>
    </div>
    </div>
    <div className="base-stats-parameters">
    <div className="base-stat-visual-representation">
        <div className="line-container">
            <div className={`bgc-`+data.types[0].type.name+` colored-result hp`}>
                <style jsx>
                    {
            `.hp {
                width:${countStats(stats.hpMax,stats.hp)}%;}`
            }
                </style>
            </div>
        </div>
        <div className="line-container">
            <div className={`bgc-`+data.types[0].type.name+` colored-result atk`}>
            <style jsx>
                    {
            `.atk {
                width:${countStats(stats.atkMax,stats.atk)}%;}`
            }
                </style>
            </div>
    </div>
        <div className="line-container">
            <div className={`bgc-`+data.types[0].type.name+` colored-result def`}>
            <style jsx>
                    {
            `.def {
                width:${countStats(stats.defMax,stats.def)}%;}`
            }
                </style>
        </div>
    </div>
        <div className="line-container">
            <div className={`bgc-`+data.types[0].type.name+` colored-result satk`}>
            <style jsx>
                    {
            `.satk {
                width:${countStats(stats.satkMax,stats.satk)}%;}`
            }
                </style>
        </div>
    </div>
        <div className="line-container">
            <div className={`bgc-`+data.types[0].type.name+` colored-result sdef`}>
            <style jsx>
                    {
            `.sdef {
                width:${countStats(stats.sdefMax,stats.sdef)}%;}`
            }
                </style>
    </div>
    </div>
        <div className="line-container">
            <div className={`bgc-`+data.types[0].type.name+` colored-result spd`}>
            <style jsx>
                    {
            `.spd {
                width:${countStats(stats.spdMax,stats.spd)}%;}`
            }
                </style>
            </div>
            </div>
        </div>
</div>
</div>
</div>
</div>
    )
}



export const getServerSideProps:GetServerSideProps=async(context)=>{
    const {name}=context.params
    const apiUrl=process.env.NEXT_PUBLIC_API
  
    const allPokemonsNamesAndIds=await getAllPokemonsNamesAndIds();
    if(!(allPokemonsNamesAndIds.includes(name))){
        return{
            notFound:true,
        }
    }

    const response=await fetch(`${apiUrl}/pokemon/${name}`);
    const responseStatus=response.status==404? true:false;
    const data=await response.json();

    if(responseStatus){
        return{
            notFound:true,
        }
    }

    const response2=await fetch(`${apiUrl}/pokemon-species/${name}`)
    const data2=await response2.json();


    return {
        props:{
            data,
            data2,
        },
    }
}
export default Pokemon