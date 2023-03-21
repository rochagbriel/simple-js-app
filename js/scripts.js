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

// this loop prints the Pokemon name and size in individual html paragraphs
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height <= 0.5) {
        document.write(`<p>${pokemonList[i].name}(height: ${pokemonList[i].height}m) OMG! - It's too small!</p>`); //this conditional check if the pokemon size is 0.5m or lower
    } else {
        document.write(`<p>${pokemonList[i].name}(height: ${pokemonList[i].height}m)</p>`);
    }
}