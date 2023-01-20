//jshint esversion:6

let pokemonList = [
    { name: 'Mr. Mime', height: 1.3, type: ['psychic' , 'fairy']},
    { name: 'Nidoran', height: 0.5, types: ['poison'] },
    { name: 'Golem', height: 1.4, types: ['rock', 'ground'] },
    { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] },
];


for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 1.5)
      {
        document.write(`${pokemonList[i].name} (height:  ${pokemonList[i].height}) <br>`);
      } 
    else if (pokemonList[i].height > 1.5) 
      {
        document.write(`${pokemonList[i].name } (height: ${pokemonList[i].height}) - Wow! That's big!<br>`);
      }
}