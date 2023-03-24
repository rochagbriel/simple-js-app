let pokemonRepository = (function () {
    let pokemonList = [
        {
            id: 1,
            name:'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            id: 4,
            name:'Charmander',
            height: 0.6,
            types: ['fire', 'normal']
        },
        {
            id: 7,
            name:'Squirtle',
            height: 0.5,
            types: ['water', 'normal']
        }
    ];

    //function to check if tha Added data is an object
    function addv() {
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

    return {
        add: add,
        getAll: getAll
    };

})();

// this loop prints the Pokemon name and size in individual html paragraphs
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height >= 0.7) {
        document.write(`<p>${pokemon.name}(height: ${pokemon.height}m) - Wow, that's big!</p>`);
    } else {
        document.write(`<p>${pokemon.name}(height: ${pokemon.height}m)</p>`);
    }
});