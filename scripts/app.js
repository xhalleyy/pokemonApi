import { saveToLocal, getLocal, removeFromLocal } from "./localstorage.js";

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
let modalID = document.getElementById('modalID');

let pokemon = "";

// API calls
// pokemonApi grabs basic info but no evolution chain, but gives ID. With that ID, we can search for species. Species links to evolution chain API
const pokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    console.log(data);
    return data;
}

const speciesApi = async (id) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await promise.json();
    return data;
}

const evolutionApi = async (evolutionID) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionID}/`);
    const data = await promise.json();
    return data; 
}

// pokemonApi("ditto");

searchBtn.addEventListener('click', async ()=> {
    
    try 
    {
        pokemon = await pokemonApi(inputField.value);
    } 
    catch 
    {
        // modalID.show();
    }
    
});

heartBtn.addEventListener('click', () => {
    saveToLocal(pokemon.name);
});