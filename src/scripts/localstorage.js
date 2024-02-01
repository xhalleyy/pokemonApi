const saveToLocal = (pokemon) => {

    // favorite will get the current values in local storage
    let favorites = getLocal();

    if(!favorites.includes(pokemon)){
        favorites.push(pokemon)
    }

    localStorage.setItem("favorited", JSON.stringify(favorites));
}

const getLocal = () => {
    let localStorageData = localStorage.getItem("favorited");

    if(localStorageData == null)
    {
        // If there is no data in local storage, it defaults to an empty array
        return [];
    }

    return JSON.parse(localStorageData);
}

const removeFromLocal = (pokemon) => {
    let favorites = getLocal();
    let pokeIndex = favorites.indexOf(pokemon);
    favorites.splice(pokeIndex, 1);
    localStorage.setItem("favorited", JSON.stringify(favorites));
}

export {saveToLocal, getLocal, removeFromLocal}