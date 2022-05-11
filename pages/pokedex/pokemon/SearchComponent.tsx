import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import React from 'react';

interface SearchForPokemon {
  result:{item:{
    name:string}}[],
  route:string|number|null,
  onSubmit:(e:React.SyntheticEvent)=>void,
  onChangeAutocomplete:(value:string|number)=>void,
  onChangeTextField:(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void,
}

const SearchForPokemon:React.FC<SearchForPokemon>=({result,route,onSubmit,onChangeAutocomplete,onChangeTextField})=>{
    return(      
<form role="form" onSubmit={(e)=>onSubmit(e) }>
<div className="search-container">
<Stack spacing={2} 
sx={{ width: 328}}
>
<Autocomplete
role="searchbox"
aria-autocomplete="list"
id="free-solo-demo"
filterOptions={(x) => x}
freeSolo='true'
options={
    result.map((r)=>{
            return r.item.name[0].toUpperCase()+r.item.name.substring(1)

    }
)
}
onChange={(e,value) =>{
onChangeAutocomplete(value)}
}
renderInput={(params) => <TextField {...params} aria-placeholder="Pokémon Name or Id" label="Pokémon Name or Id"  style={{ backgroundColor: 'white' }} value={route} 
size="small"
sx={{
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
borderColor: "lightGrey",
      }
    },
    "& label.Mui-focused": {
        display: "none"
      },
      "& legend": {
        display: "none",
      },

        "& .MuiInputBase-input": {
          height: '12px', 
   },
   "& .MuiOutlinedInput-root":{
       "& fieldset":{
           marginTop:'5px'
       }
   },

      "& label": {
        marginTop: "-1%",
        fontSize:'13px'
      },
     
  }}
 onChange={(e)=>{onChangeTextField(e)}}/>}
/>
</Stack>   
</div>
</form>
    )}

export default SearchForPokemon