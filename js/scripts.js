
let pokemonRepository = (function () {
  
  let pokemonList = [
    { name: 'Mr. Mime', height: 1.3, type: ['psychic' , 'fairy']},
    { name: 'Nidoran', height: 0.5, types: ['poison'] },
    { name: 'Golem', height: 1.4, types: ['rock', 'ground'] },
    { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] },
];
  
function add(pokemon) {
    if (typeof pokemon === 'object' &&
    'name' in pokemon )
      if ('height' in pokemon && typeof pokemon.height === 'number') 
        {
          pokemonList.push(pokemon);
        }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonList = pokemonRepository.getAll(); 

pokemonRepository.add({ name: 'Pikachu', height: 1.7, type: [] });


pokemonList.forEach(item =>{
  if (item.height < 1.5)
  {
    document.write(`${item.name} (height:  ${item.height})<br>`);
  } 
  else if (item.height > 1.5) 
  {
    document.write(`${item.name } (height: ${item.height}) - Wow! That's big!<br>`);
  }
})