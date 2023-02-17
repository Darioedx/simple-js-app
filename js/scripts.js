
let pokemonRepository = (function () {

 let pokemonList = [];
 let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
 
 function add(pokemon) {
    //if (typeof pokemon === 'object' && 'name' in pokemon && typeof pokemon.name == 'string')
      //{
        //if ('height' in pokemon && typeof pokemon.height === 'number') 
          //{
            pokemonList.push(pokemon);
          //}
      //}  
    
  }
  //add buutons to ul//
  function addListItem(item){
    let list= document.querySelector('.pokemon-list');
    let listOfitems= document.createElement('li');
    let button = document.createElement('button');
    button.innerText = item.name;
    button.classList.add('button')
    button.addEventListener('click',function(event){showDetails(item)});
    listOfitems.appendChild(button);
    list.appendChild(listOfitems);
  }
  //display poke name when event//
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let pokeName = document.querySelector('p');
      nombre = pokemon.name;
      pokeHeight = pokemon.height;
      pokeName.innerText =  `Name : ${nombre}    Height: ${pokeHeight}`;
      console.log(pokemon);
    });
  }
  function getAll() {
    return pokemonList;
  }
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
       console.error(e);
    })
  }


  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  

  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem,
    loadList : loadList,
    loadDetails : loadDetails,
    showDetails: showDetails
    
  };

})();



//pokemonRepository.add({ name: 'Pikachu', height: 1.7, type: [] });
//call addListItem to display poke list 





  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(item =>
      pokemonRepository.addListItem(item));
    });
  




let mainTitle = document.querySelector('h1');

mainTitle.innerText = 'Poke List';
console.log(mainTitle.innerText); 