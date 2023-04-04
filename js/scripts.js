let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    // Function to check if tha Added data is an object

    function addv(add) {
        return (typeof add === 'object' && 'name' in add);
    }

    // Function to add a New Pokemon

    function add(pokemon) {
        addv(pokemon)
            ? pokemonList.push(pokemon)
            : console.error("Incorrect input type");
    }

    // Function to get all pokemon in pokemonList

    function getAll() {
        return pokemonList;
    }
    // This function generate a listened button 
    function addListItem(pokemon) {

        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button', 'btn', 'btn-primary');
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#modal-container')

        listItem.classList.add('list-group-item');
        list.appendChild(listItem);
        listItem.appendChild(button);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    // Function as a return key that uses fetch to GET the complete list of Pokémon from the API URL

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

    // This function fetch data from API and create objects with requested info.

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
            item.id = details.id;
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
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
        const loadingMessage = document.querySelector(".loading-message");

        // Remove the "loading" message from the body of the document
        if (loadingMessage) {
            document.body.removeChild(loadingMessage);
        }
    }

    // This function display all details loaded at loadDetails function

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon)
        });
    }

    function showModal(item) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');

        // Clear all existing modal content
        modalTitle.innerHTML = '';
        modalBody.innerHTML = '';

        // Add the new modal content
        let pokemonName = document.createElement('h1');
        pokemonName.innerHTML = `${item.id} - ${item.name}`;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerHTML = `Height: ${(item.height) / 10} m`;

        let pokemonImg = document.createElement('img');
        pokemonImg.classList.add('pokemon-photo', 'modal-img')
        pokemonImg.src = item.imageUrl;

        modalTitle.appendChild(pokemonName);
        modalBody.appendChild(pokemonImg);
        modalBody.appendChild(pokemonHeight);

    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});