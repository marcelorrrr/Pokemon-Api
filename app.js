
class PokeAPI {
    constructor() {
        this.baseURL = "https://pokeapi.co/api/v2/pokemon/";
    }

   
    async fetchPokemon(nameOrId) {
       
        const url = this.baseURL + nameOrId.toLowerCase();

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("No se encontró el Pokémon.");
            }

            const data = await response.json();
            return data;

        } catch (error) {
            
            throw error;
        }
    }
}


class UI {
    constructor() {
        this.resultElement = document.getElementById("pokemonResult");
    }

   
    showLoading() {
        this.resultElement.innerHTML = "<p>Cargando...</p>";
    }

    
    displayPokemon(pokemonData) {
        const name = pokemonData.name;
        const id = pokemonData.id;
        const imageUrl = pokemonData.sprites.front_default; 

        const html = `
            <h2>${name} (#${id})</h2>
            <img src="${imageUrl}" alt="Imagen de ${name}">
        `;

        this.resultElement.innerHTML = html;
    }

   
    displayError(message) {
        const html = `<p class="error">${message}</p>`;
        this.resultElement.innerHTML = html;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    
    
    const api = new PokeAPI();
    const ui = new UI();

    const searchButton = document.getElementById("searchButton");
    const pokemonInput = document.getElementById("pokemonInput");

    
    const handleSearch = async () => {
        const query = pokemonInput.value;

        if (!query) {
            ui.displayError("Por favor, escribe un nombre o ID.");
            return;
        }

        ui.showLoading();

        try {
            const pokemonData = await api.fetchPokemon(query);
            ui.displayPokemon(pokemonData);
        } catch (error) {
            ui.displayError("No se encontró el Pokémon. ¡Intenta de nuevo!");
        }
    };

  
    searchButton.addEventListener("click", handleSearch);

    pokemonInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
});