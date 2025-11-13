// Home no pop up
function goHome() {
    window.location.href = "./index.html";
}

// Favorite no pop up
function goFavorite() {
    window.location.href = "./favoritos.html";
}

// Adiciona
document.getElementById("addFavButton").addEventListener("click", async () => {

    const id = document.getElementById("addFav").value;
    const notes = document.getElementById("notesFav").value;
    const data = {"id": id, "notes": notes};

    const response = await fetch("http://localhost:8080/createFav", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    window.alert("Pokemon Inserido");
    list();
});

// Remove
document.getElementById("removeFavButton").addEventListener("click", async () => {

    const id = document.getElementById("addFav").value;
    const data = {"id": id};

    const response = await fetch("http://localhost:8080/deleteFav", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    window.alert("Pokemon Removido");
    list();
});

// Update
document.getElementById("updateFavButton").addEventListener("click", async () => {

    const id = document.getElementById("addFav").value;
    const notes = document.getElementById("notesFav").value;
    const data = {"id": id, "notes": notes};

    const response = await fetch("http://localhost:8080/updateFav", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    window.alert("Pokemon Atualizado");
    list();
});

// Read/List
document.addEventListener("DOMContentLoaded", list());

async function list() {

    const favList = localStorage.getItem('favoritePokemons') ? JSON.parse(localStorage.getItem('favoritePokemons')) : [];
    const containerFav = document.getElementById("pokemonContainerFav");
    containerFav.innerHTML = "";

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const response = await fetch("http://localhost:8080/listFav", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json();

    result.data.forEach(async pokemon => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
    
        if (!response.ok) {
            throw new Error(`ERRO - Pokemon ID ${i}`);
        }

        const data = await response.json();
        const pokemonId = data.id;
        const pokemonName = data.name;
        const pokemonSpriteUrl = data.sprites.front_default; 
        const pokemonFirstType = data.types[0].type.name;
        let pokemonSecondType = '';

        if (data.types.length == 2) {
            pokemonSecondType = data.types[1].type.name;
        }

        const pokemonHability = data.abilities[0].ability.name;
        const pokemonHp = data.stats[0].base_stat;
        const pokemonAtk = data.stats[1].base_stat;
        const pokemonDef = data.stats[2].base_stat;
        const pokemonSpA = data.stats[3].base_stat;
        const pokemonSpD = data.stats[4].base_stat;
        const pokemonSpe = data.stats[5].base_stat;

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-pokemon-id', pokemonId);
        card.setAttribute('data-pokemon-name', pokemonName.toLowerCase());
        card.setAttribute('data-pokemon-fristType', pokemonFirstType.toLowerCase());
        card.setAttribute('data-pokemon-secondType', pokemonSecondType.toLowerCase());

        card.innerHTML = `
            <div class="info">
                <img src="${pokemonSpriteUrl}" alt="${pokemonName}">
                <span>${pokemonId}</span>
                <span><strong>${capitalizeFirstLetter(pokemonName)}</strong></span>
                <span>${capitalizeFirstLetter(pokemonHability)}</span> 
                <div>
                    <span>${capitalizeFirstLetter(pokemonFirstType)}</span>
                    <span>${capitalizeFirstLetter(pokemonSecondType)}</span>
                </div>
            </div>
            <div class="stats">
                <span>HP: ${pokemonHp}</span>
                <span>ATK: ${pokemonAtk}</span>
                <span>DEF: ${pokemonDef}</span>
                <span>SPA: ${pokemonSpA}</span>
                <span>SPD: ${pokemonSpD}</span>
                <span>SPE: ${pokemonSpe}</span>
                <span>Nota: ${capitalizeFirstLetter(pokemon.nota)} </span>
            </div>
        `;
            
            containerFav.appendChild(card);
    });
}


