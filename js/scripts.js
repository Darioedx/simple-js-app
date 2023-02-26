
let pokemonRepository = (function () {
let mainTitle = document.querySelector('h1');

mainTitle.innerText = 'Poke List';
console.log(mainTitle.innerText);

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


  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(item =>
      pokemonRepository.addListItem(item));
    });
  


let modalIIFE= (function (){
  let modalContainer = document.querySelector('#modal-container');//target div whr details 
  
  function showModal(pokemon) {
    let detailsArray = [pokemon.name, pokemon.height]
    modalContainer.innerHTML = '';
   
    let divTxt = document.createElement('div');
    divTxt.classList.add('info')
    modalContainer.appendChild(divTxt);
    //dysplay name and height
    for (let i = 0; i < detailsArray.length; i++){
      let contentElement = document.createElement('p');
      if (i == 0){
        contentElement.innerText = `Name: ${detailsArray[i]}`;
        divTxt.appendChild(contentElement);
                
      }
      else{
        contentElement.innerText = `Height: ${detailsArray[i]}`;
        divTxt.appendChild(contentElement);
              
      }
    }
   
    //show types
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
    let closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.classList.add('buttonClose')
    closeButton.addEventListener('click',hideModal);
    
    let divImg = document.createElement('div');
    divImg.classList.add('infoImg')
    let myImage = document.createElement('img');
    myImage.src = pokemon.imageUrl;
    
    modalContainer.appendChild(divImg);
   
    divImg.appendChild(closeButton);
    divImg.appendChild(myImage);
    
    modalContainer.classList.add('is-visible');// add class to div    
   
    document.querySelector('.button').addEventListener('click', () => {
      showModal(pokemon);
    });
  }

 
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');

     
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
      showModal: showModal,
      hideModal: hideModal
  }
})();