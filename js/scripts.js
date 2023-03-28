let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //function to check if tha Added data is an object
    function addv(add) {
        return typeof add === 'object' ? true : false;
    }
    //function to add a New Pokemon
    function add(pokemon) {
        addv(pokemon) 
         ? pokemonList.push(pokemon) 
         : console.error("Incorrect input type");
    }
    //function to get all pokemon in pokemonList
    function getAll() {
        return pokemonList;
    }
    //this function generate a listened button 
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listIten = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        list.appendChild(listIten);
        listIten.appendChild(button);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })
    }
    //function as a return key that uses fetch to GET the complete list of Pokémon from the API URL
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            hideLoadingMessage();
          });
        }).catch(function (e) {
          console.error(e);
          hideLoadingMessage();
        })
    }
    //This function fetch data from API and create objects with requested info.
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            hideLoadingMessage();
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
          hideLoadingMessage();
        });
    }
    //This function display all details loaded at loadDetails function
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () 
        {
            console.log(item)
        });
    }

    // Function for generating loading message
    function showLoadingMessage() {
        // Create an element for the "loading" message
        const loadingMessage = document.createElement('p');
        loadingMessage.innerText = 'LOADING!'
        loadingMessage.classList.add('loading-message');
    
        // Add the loading message to the body of the document
        document.body.appendChild(loadingMessage);  
    }
  
    // Function for deleting loading message
    function hideLoadingMessage() {
        // Select the "loading" message element
        const loadingMessage = document.querySelector('.loading-message');
    
        // Remove the "loading" message from the body of the document
        if (loadingMessage) {
        document.body.removeChild(loadingMessage);
        }
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});