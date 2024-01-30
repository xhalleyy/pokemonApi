// IDs
let randomBtn = document.getElementById('randomBtn');
let inputField = document.getElementById('inputField');
let searchBtn = document.getElementById('searchBtn');
let favoritesBtn = document.getElementById('favoritesBtn');
let pokeName = document.getElementById('pokeName');
let heartBtn = document.getElementById('heartBtn');
let pokeImg = document.getElementById('pokeImg');
let elements = document.getElementById('elements');
let abilitiesTxt = document.getElementById('abilitiesTxt');
let movesTxt = document.getElementById('movesTxt');
let locationTxt = document.getElementById('locationTxt');
let evolutions = document.getElementById('evolutions');

// API call
const pokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

pokemonApi("ditto");

searchBtn.addEventListener('click', async ()=> {

});