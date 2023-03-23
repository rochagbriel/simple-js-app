const pokemonList = [
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

// this IIFE Function prints the Pokemon name and size in individual html paragraphs
(pokemonList.forEach(function(pokemon) {
    if (pokemon.height >= 0.7) {
        document.write(`<p>${pokemon.name}(height: ${pokemon.height}m) - Wow, that's big!</p>`); //this conditional check if the pokemon size is 0.7m or bigger
    } else {
        document.write(`<p>${pokemon.name}(height: ${pokemon.height}m)</p>`);
    }
}))();