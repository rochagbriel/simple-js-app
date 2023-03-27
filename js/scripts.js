let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //function to create and validade a New Pokemon object
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.error('Incorrect input type');
        }
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
    //This function fetch data from API and create objects with requested info.
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
    //This function display all details loaded at loadDetails function
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () 
        {
            console.log(item)
        });
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