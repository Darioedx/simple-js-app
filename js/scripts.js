
let pokemonRepository = (function () {
  
  let pokemonList = [
    { name: 'Mr. Mime', height: 1.3, type: ['psychic' , 'fairy']},
    { name: 'Nidoran', height: 0.5, types: ['poison'] },
    { name: 'Golem', height: 1.4, types: ['rock', 'ground'] },
    { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] },
];
  
function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && typeof pokemon.name == 'string')
      {
        if ('height' in pokemon && typeof pokemon.height === 'number') 
          {
            pokemonList.push(pokemon);
          }
      }  
  }
  //add buutons to ul//
  function addListItem(item){
    let list= document.querySelector('.pokemon-list');
    let listOfitems= document.createElement('li');
    let button = document.createElement('button');
    button.innerText = item.name;
    button.classList.add('button')
    button.addEventListener('click',showDetails);
    listOfitems.appendChild(button);
    list.appendChild(listOfitems);
  }
  //display poke name when event//
  function showDetails(pokemon){
    let button = pokemon.target;//pass event as parameter (avent.target)//
    let pokeName = document.querySelector('p');
    pokeName.innerText = button.innerText;
    console.log(pokeName);
  }
  
    function getAll() {
    return pokemonList;
  }
  

  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem,
    
  };

})();



pokemonRepository.add({ name: 'Pikachu', height: 1.7, type: [] });
//call addListItem to display poke list 
pokemonRepository.getAll().forEach(item =>{
  pokemonRepository.addListItem(item);
  
});




let mainTitle = document.querySelector('h1');

mainTitle.innerText = 'Poke List';
console.log(mainTitle.innerText); 