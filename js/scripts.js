
let pokemonRepository = (function () {
let mainTitle = document.querySelector('h1');

mainTitle.innerText = 'Poke List';
console.log(mainTitle.innerText);

 let pokemonList = [];
 let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
 
 function add(pokemon) {
    
    pokemonList.push(pokemon);   
  }
  //add buutons to ul//
  function addListItem(item){
    
    let row= document.querySelector('.row')
    let listOfitems= document.createElement('li');
    listOfitems.classList.add("list-group-item",'col-xl-3', 'col-lg-4', 'col-md-6', 'row')
    let button = document.createElement('button');
    button.innerText = item.name;
    
    button.classList.add("btn-primary");
    button.classList.add("pokemon-button");
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.addEventListener('click',function(event){showDetails(item)});
   
    listOfitems.appendChild(button);
    row.appendChild(listOfitems);
  }
  //display poke name when event//
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {   
      modalIIFE.showModal(pokemon);
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
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function navSearch(){
    clearButton = document.querySelector('#clear')
    nav = document.querySelector('.navbar-nav');
    
    for (i = 97; i <= 122; i++) {
      let navButton = document.createElement('button');
      navButton.innerText= String.fromCharCode(i);
      navButton.classList.add("btn-warning");
      navButton.setAttribute('id', 'put');
      let pkmn = document.querySelector('.showSearch'); 
      nav.classList.add("list-group-item", 'row','col');
      
      navButton.addEventListener('click',function(event){      
        clearButton.removeAttribute('id');   
        clearButton.addEventListener('click', function(){
          pkmn.innerHTML = '';
          clearButton.setAttribute('id','clear');
        })
        
        for(i in pokemonList){
            if (pokemonList[i].name.startsWith(navButton.innerText)){
               let showSearch = document.createElement('button');
               showSearch.setAttribute('data-toggle', 'modal');
               showSearch.setAttribute('data-target', '#exampleModal');
               showSearch.setAttribute('id', 'btnSearch')
               showSearch.innerText = pokemonList[i].name;
               pkmn.appendChild(showSearch); 
               showSearch.addEventListener('click',function(event){
                let pmn = event.target.innerText ;
                for(j in pokemonList){
                  if(pokemonList[j].name == pmn){
                    showDetails(pokemonList[j])
                  }
                } 
                        
              });                                        
            } 
            
                   
          } 
      });
      
     nav.appendChild(navButton);      
    }
    
  }
   ////////////////////////////////////////////////////  
 
   
  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem,
    loadList : loadList,
    loadDetails : loadDetails,
    showDetails: showDetails,
    navSearch : navSearch
  };

})();


  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(item =>
      pokemonRepository.addListItem(item));
      pokemonRepository.navSearch()
    });

   

  


let modalIIFE= (function (){
  let modalContainer = document.querySelector('#modalRow');//target div whr details 
  
  function showModal(pokemon) {
    let detailsArray = [pokemon.weight, pokemon.height]
    modalContainer.innerHTML = '';
    pokeName = document.querySelector('h5');
    pokeName.innerText = `Name: ${pokemon.name}`;
    let divTxt = document.createElement('div');
    divTxt.classList.add('col-6')
    modalContainer.appendChild(divTxt);
    //dysplay name and height
    for (let i = 0; i < detailsArray.length; i++){
      let contentElement = document.createElement('p');
      if (i == 0){
        contentElement.innerText = `Weight: ${detailsArray[i]}`;
        divTxt.appendChild(contentElement);
                
      }
      else{
        contentElement.innerText = `Height: ${detailsArray[i]}`;
        divTxt.appendChild(contentElement);
              
      }
    }
   
    //get types
    for (let i = 0; i < pokemon.types.length; i++) {
      let contentElement = document.createElement('p');
      if (pokemon.types.length == 1 && i == 0){
        contentElement.innerText = `type: ${pokemon.types[i].type.name}`;
        divTxt.appendChild(contentElement);
      }
      else{
        contentElement.innerText = `type: ${pokemon.types[i].type.name} and ${pokemon.types[(i+1)].type.name} `;
        divTxt.appendChild(contentElement);
        break;
      }
    } 
     //dysplay img and create close button
    
    let divImg = document.createElement('div');
    divImg.classList.add('col-6')
    let myImage = document.createElement('img');
    myImage.src = pokemon.imageUrl;
    modalContainer.appendChild(divImg);
    divImg.appendChild(myImage);
    
     
   
   
  }
  return {
      showModal: showModal,
      
  }
})();