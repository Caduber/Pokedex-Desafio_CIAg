// Home no pop up
function goHome() {
    window.location.href = "./index.html";
}

// Favorite no pop up
function goFavorite() {
    window.location.href = "./favoritos.html";
}

// Adiciona
document.getElementById("addFavButton").addEventListener("click", (event) => {

    const pokemonIdToAdd = document.getElementById("addFav").value; //event.target.value;
    const favList = localStorage.getItem('favoritePokemons') ? JSON.parse(localStorage.getItem('favoritePokemons')) : [];

    if (!favList.includes(pokemonIdToAdd) && pokemonIdToAdd > 0 && pokemonIdToAdd <= 1026) {

        favList.push(pokemonIdToAdd);
        localStorage.setItem('favoritePokemons', JSON.stringify(favList));
        alert(`Pokémon com ID ${pokemonIdToAdd} adicionado aos favoritos!`);
        list();

    } else {
        alert("Um erro ocorreu, tente novamente");
    }   
});

// Lista

document.addEventListener("DOMContentLoaded", list());

// document.getElementById("listFav").addEventListener("click", list());
//A lista agora se atualiza automaticamente (versão 3.0)

function list() {

    const favList = localStorage.getItem('favoritePokemons') ? JSON.parse(localStorage.getItem('favoritePokemons')) : [];
    const containerFav = document.getElementById("pokemonContainerFav");
    containerFav.innerHTML = "";

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    favList.forEach(async pokemon => {

        try {

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            
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
                </div>
            `;
                
                containerFav.appendChild(card);

        }catch(e) {
            console.error("ERRO - ", e);
        }
    });
}

// Remove
document.getElementById("removeFavButton").addEventListener("click", (event) => {

    const pokemonIdToRemove = document.getElementById("removeFav").value;
    const favList = localStorage.getItem('favoritePokemons') ? JSON.parse(localStorage.getItem('favoritePokemons')) : [];
    
    if (favList.includes(pokemonIdToRemove) && pokemonIdToRemove > 0 && pokemonIdToRemove <= 1026) {

        const updatedList = favList.filter(pokemon => pokemon != pokemonIdToRemove);
        localStorage.setItem('favoritePokemons', JSON.stringify(updatedList));
        window.alert(`Pokémon com ID ${pokemonIdToRemove} removido dos favoritos!`);
        list();
    }
    else {
        const alert = pokemonIdToRemove == "" ? null : window.alert("Erro - Tente Novamente");
    }
});

// Edita
document.getElementById("editFav").addEventListener("click", () => {
    
    const notesWindow = window.open("", "", "width=900, height=600");
    const noteHistory = localStorage.getItem("pokemonNotes") || "";

    notesWindow.document.writeln(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="./assets/favicon.ico" type="image/x-icon">
            <title>Notas</title>
        </head>
        <body>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    background-color: #c95252;
                }
                button {
                    background-color: #ffcd19;
                    border: none;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 10px;
                    cursor: pointer;
                }
            </style>
            <textarea name="notes" id="notes" rows="35" cols="100" autofocus placeholder="Eu acho...">${noteHistory}</textarea>
            <button id="saveNote">Salvar</button>
        </body>
        </html>
        `)

        notesWindow.document.getElementById("saveNote").addEventListener("click", (event) => {
        const userNotes = notesWindow.document.getElementById("notes");
        localStorage.setItem("pokemonNotes", userNotes.value);
        notesWindow.window.close();
    })
});

