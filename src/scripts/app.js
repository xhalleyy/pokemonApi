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
let normalOrShiny = document.getElementById('normalOrShiny');

let pokemon = {};
let hearted;
let shiny = false;

// API calls
const pokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();
    return data;
}

const locationApi = async (location) => {
    const promise = await fetch(location);
    const data = await promise.json();
    return data;
}

const speciesApi = async (species) => {
    const promise = await fetch(species);
    const data = await promise.json();
    return data;
}

const evolutionApi = async (evolution) => {
    const promise = await fetch(evolution);
    const data = await promise.json();
    return data;
}

searchBtn.addEventListener('click', async () => {

    try {

        // Save APIs in a variable
        pokemon = await pokemonApi(inputField.value);
        let pokeLocation = await locationApi(pokemon.location_area_encounters);
        let species = await speciesApi(pokemon.species.url);
        let evolution = await evolutionApi(species.evolution_chain.url);

        let gens = pokemon.id
        // If the id is less than 650 (GEN 1-5 Pokemons), then this code block will run. If not, there will be an alert
        if (gens < 650) {
            let evolArray = [];
            let evolChain = evolution.chain;

            // EVOLUTION PATH CHAIN: maps through first evolution and checks if there is another evolution.
            evolChain.evolves_to.map(evol1 => {
                if(evol1.evolves_to.length > 0) {
                    evol1.evolves_to.map(evol2 => {
                        evolArray.push(`${evolChain.species.name} → ${evol1.species.name} → ${evol2.species.name}`);
                    })
                }else {
                    evolArray.push(evolChain.species.name + ' → ' + evol1.species.name);
                }
            });

            // DISPLAYING TEXT
            pokeName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            abilitiesTxt.textContent = pokemon.abilities.map(pokeAbility => pokeAbility.ability.name).join(", ");
            movesTxt.textContent = pokemon.moves.map(pokeMoves => pokeMoves.move.name).join(", ").replaceAll('-', ' ');
            elements.textContent = pokemon.types.map(pokeEl => pokeEl.type.name).join(", ");
            pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;

            if (pokeLocation.length == 0) {
                locationTxt.textContent = 'Unknown';
            } else {
                locationTxt.textContent = (pokeLocation[0].location_area.name).split('-').join(' ');
            }

            if (evolChain.evolves_to.length == 0) {
                evolutions.textContent = 'N/A';
            } else {
                evolutions.textContent = evolArray.join(', ');
            }

            pokeImg.addEventListener('click', () => {
                if (shiny) {
                    pokeImg.src = pokemon.sprites.other["official-artwork"].front_shiny;
                    normalOrShiny.textContent = 'Shiny';
                    normalOrShiny.classList.remove('bg-blue-200');
                    normalOrShiny.classList.add('bg-yellow-200');
                } else {
                    pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
                    normalOrShiny.textContent = 'Default';
                    normalOrShiny.classList.add('bg-blue-200');
                    normalOrShiny.classList.remove('bg-yellow-200');
                }
                shiny = !shiny;
            });
            // if statement witht he conditional hearted = true to keep track if they favorited it or not.
            let favoritedData = localStorage.getItem("favorited");
            hearted = favoritedData && favoritedData.includes(pokemon.name);
            if (hearted) {
                heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>';
            } else {
                heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>';

            }
        } else {
            alert("Please Pick a Pokemon from Gen 1-5!");
        }
    }
    catch
    {
        alert("That wasn't a valid Pokemon! Try Again.");
    }

});

// Random Pokemon
randomBtn.addEventListener('click', async () => {
    let randomNum = Math.floor(Math.random() * 650)
    pokemon = await pokemonApi(randomNum);
    let pokeLocation = await locationApi(pokemon.location_area_encounters);
    let species = await speciesApi(pokemon.species.url);
    let evolution = await evolutionApi(species.evolution_chain.url);

    let evolArray = [];
    let evolChain = evolution.chain;

            // EVOLUTION PATH CHAIN: maps through first evolution and checks if there is another evolution.
            evolChain.evolves_to.map(evol1 => {
                if(evol1.evolves_to.length > 0) {
                    evol1.evolves_to.map(evol2 => {
                        evolArray.push(`${evolChain.species.name} → ${evol1.species.name} → ${evol2.species.name}`);
                    })
                }else {
                    evolArray.push(evolChain.species.name + ' → ' + evol1.species.name);
                }
            });

    console.log(evolArray);

    pokeName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    abilitiesTxt.textContent = pokemon.abilities.map(pokeAbility => pokeAbility.ability.name).join(", ");
    movesTxt.textContent = pokemon.moves.map(pokeMoves => pokeMoves.move.name).join(", ").replaceAll('-', ' ');
    elements.textContent = pokemon.types.map(pokeEl => pokeEl.type.name).join(", ");
    pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;


    if (pokeLocation.length == 0) {
        locationTxt.textContent = 'Unknown';
    } else {
        locationTxt.textContent = (pokeLocation[0].location_area.name).split('-').join(' ');
    }

    if (evolChain.evolves_to.length == 0) {
        evolutions.textContent = 'N/A';
    } else {
        evolutions.textContent = evolArray.join(', ');
    }

    pokeImg.addEventListener('click', () => {
        if (shiny) {
            pokeImg.src = pokemon.sprites.other["official-artwork"].front_shiny;
            normalOrShiny.textContent = 'Shiny';
            normalOrShiny.classList.remove('bg-blue-200');
            normalOrShiny.classList.add('bg-yellow-200');
        } else {
            pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
            normalOrShiny.textContent = 'Default';
            normalOrShiny.classList.add('bg-blue-200');
            normalOrShiny.classList.remove('bg-yellow-200');
        }
        shiny = !shiny;
    });

    let favoritedData = localStorage.getItem("favorited");
    hearted = favoritedData && favoritedData.includes(pokemon.name);
    if (hearted) {
        heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>';
    } else {
        heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>';

    }
});

heartBtn.addEventListener('click', () => {

    const favoritedData = localStorage.getItem("favorited");

    if (favoritedData && favoritedData.includes(pokemon.name)) {
        hearted = true;
        heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>';
        removeFromLocal(pokemon.name);
    } else {
        hearted = false;
        saveToLocal(pokemon.name);
        heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>';
    }
});


favoritesBtn.addEventListener('click', () => {
    let favorites = getLocal();
    favoritedDiv.textContent = "";

    favorites.map(favName => {
        let div = document.createElement('div');
        div.className = "grid grid-cols-2 bg-white my-5 py-1 ps-2 rounded-2xl items-center cursor-pointer";

        let p = document.createElement('p');
        p.textContent = favName.charAt(0).toUpperCase() + favName.slice(1);
        p.className = "font-kodchasan-medium col-span-1 text-gray-800 text-2xl";

        let span = document.createElement('span');
        span.textContent = "remove";
        span.className = "material-symbols-outlined col-span-1 cursor-pointer text-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-md w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white ml-auto me-2";

        span.addEventListener('click', () => {
            removeFromLocal(favName);
            div.remove();
        });

        div.addEventListener('click', async () => {
            pokemon = await pokemonApi(favName);
            let pokeLocation = await locationApi(pokemon.location_area_encounters);
            let species = await speciesApi(pokemon.species.url);
            let evolution = await evolutionApi(species.evolution_chain.url);

            let evolArray = [];
            let evolChain = evolution.chain;

            // EVOLUTION PATH CHAIN: maps through first evolution and checks if there is another evolution.
            evolChain.evolves_to.map(evol1 => {
                if(evol1.evolves_to.length > 0) {
                    evol1.evolves_to.map(evol2 => {
                        evolArray.push(`${evolChain.species.name} → ${evol1.species.name} → ${evol2.species.name}`);
                    })
                }else {
                    evolArray.push(evolChain.species.name + ' → ' + evol1.species.name);
                }
            });


            pokeName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            abilitiesTxt.textContent = pokemon.abilities.map(pokeAbility => pokeAbility.ability.name).join(", ");
            movesTxt.textContent = pokemon.moves.map(pokeMoves => pokeMoves.move.name).join(", ").replaceAll('-', ' ');
            elements.textContent = pokemon.types.map(pokeEl => pokeEl.type.name).join(", ");
            pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;


            if (pokeLocation.length == 0) {
                locationTxt.textContent = 'Unknown';
            } else {
                locationTxt.textContent = (pokeLocation[0].location_area.name).split('-').join(' ');
            }

            if (evolChain.evolves_to.length == 0) {
                evolutions.textContent = 'N/A';
            } else {
                evolutions.textContent = evolArray.join(', ');
            }

            pokeImg.addEventListener('click', () => {
                if (shiny) {
                    pokeImg.src = pokemon.sprites.other["official-artwork"].front_shiny;
                    normalOrShiny.textContent = 'Shiny';
                    normalOrShiny.classList.remove('bg-blue-200');
                    normalOrShiny.classList.add('bg-yellow-200');
                } else {
                    pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
                    normalOrShiny.textContent = 'Default';
                    normalOrShiny.classList.add('bg-blue-200');
                    normalOrShiny.classList.remove('bg-yellow-200');
                }
                shiny = !shiny;
            });

            let favoritedData = localStorage.getItem("favorited");
            hearted = favoritedData && favoritedData.includes(pokemon.name);
            if (hearted) {
                heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>';
            } else {
                heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>';

            }
        })

        div.appendChild(p);
        div.appendChild(span);
        favoritedDiv.appendChild(div);
    });
});

const start = async () => {
    pokemon = await pokemonApi("pikachu");
        let pokeLocation = await locationApi(pokemon.location_area_encounters);
        let species = await speciesApi(pokemon.species.url);
        let evolution = await evolutionApi(species.evolution_chain.url);

        let gens = pokemon.id

        if (gens < 650) {
            let evolArray = [];
            let evolChain = evolution.chain;

            evolChain.evolves_to.map(evol1 => {
                if(evol1.evolves_to.length > 0) {
                    evol1.evolves_to.map(evol2 => {
                        evolArray.push(`${evolChain.species.name} → ${evol1.species.name} → ${evol2.species.name}`);
                    })
                }else {
                    evolArray.push(evolChain.species.name + ' → ' + evol1.species.name);
                }
            });

            pokeName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            abilitiesTxt.textContent = pokemon.abilities.map(pokeAbility => pokeAbility.ability.name).join(", ");
            movesTxt.textContent = pokemon.moves.map(pokeMoves => pokeMoves.move.name).join(", ").replaceAll('-', ' ');
            elements.textContent = pokemon.types.map(pokeEl => pokeEl.type.name).join(", ");
            pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;


            if (pokeLocation.length == 0) {
                locationTxt.textContent = 'Unknown';
            } else {
                locationTxt.textContent = (pokeLocation[0].location_area.name).split('-').join(' ');
            }

            if (evolChain.evolves_to.length == 0) {
                evolutions.textContent = 'N/A';
            } else {
                evolutions.textContent = evolArray.join(', ');
            }

            pokeImg.addEventListener('click', () => {
                if (shiny) {
                    pokeImg.src = pokemon.sprites.other["official-artwork"].front_shiny;
                    normalOrShiny.textContent = 'Shiny';
                    normalOrShiny.classList.remove('bg-blue-200');
                    normalOrShiny.classList.add('bg-yellow-200');
                } else {
                    pokeImg.src = pokemon.sprites.other["official-artwork"].front_default;
                    normalOrShiny.textContent = 'Default';
                    normalOrShiny.classList.add('bg-blue-200');
                    normalOrShiny.classList.remove('bg-yellow-200');
                }
                shiny = !shiny;
            });
            
            let favoritedData = localStorage.getItem("favorited");
            hearted = favoritedData && favoritedData.includes(pokemon.name);
            if (hearted) {
                heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>';
            } else {
                heartBtn.innerHTML = '<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>';

            }
        } else {
            alert("Please Pick a Pokemon from Gen 1-5!");
        }
}

start();