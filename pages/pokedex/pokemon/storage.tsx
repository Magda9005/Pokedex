let storage=null;

export async function getAllPokemons(){
    if(storage){
        return storage;
    } else {
        const response2=await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=648');
        const data2=await response2.json();
        storage=data2.results;
        return storage;
    }
}