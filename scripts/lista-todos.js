// Carregador de todos os pokemons, baseado na geração selecionada
document.addEventListener('DOMContentLoaded', () => {
    
    const pokemonContainer = document.getElementById('pokemonContainer');
    const totalPokemon = localStorage.getItem('generations') || 151;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const fetchAndDisplayAllPokemon = async () => {

        pokemonContainer.innerHTML = '';

        try {

            for (let i = 1; i <= totalPokemon; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                
                if (!response.ok) {
                    throw new Error(`ERRO - Pokemon ID ${i}`);
                }

                const pokemon = await response.json();
                const pokemonId = pokemon.id;
                const pokemonName = pokemon.name;
                const pokemonSpriteUrl = pokemon.sprites.front_default; 
                const pokemonFirstType = pokemon.types[0].type.name;
                let pokemonSecondType = '';
                if (pokemon.types.length == 2) {
                    pokemonSecondType = pokemon.types[1].type.name;
                }
                const pokemonHability = pokemon.abilities[0].ability.name;
                // const pokemonStats = pokemon.stats.map(stat => ({
                //     name: stat.stat.name,
                //     value: stat.base_stat    
                // }));

                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-pokemon-id', pokemonId);
                card.setAttribute('data-pokemon-name', pokemonName.toLowerCase());

                card.innerHTML = `
                    <img src="${pokemonSpriteUrl}" alt="${pokemonName}">
                    <span>${pokemonId}</span>
                    <span><strong>${capitalizeFirstLetter(pokemonName)}</strong></span>
                    <span>${pokemonHability}</span> 
                    <div>
                        <span>${pokemonFirstType}</span>
                        <span>${pokemonSecondType}</span>
                    </div>
                `;
                
                pokemonContainer.appendChild(card);

                // Avisa quando a barra de pesquisa estiver pronta
                if( i < localStorage.getItem('generations')){
                    localStorage.setItem('isLoaded', 'false');
                    document.getElementById("searchInput").placeholder = "Aguarde o carregamento dos Pokémons...";
                }
                else {
                    localStorage.setItem('isLoaded', 'true');
                    document.getElementById("searchInput").placeholder = "Buscar Pokémon...";
                }
            }

        } catch (error) {
            console.error('ERRO - ', error);
        }
    };  

    fetchAndDisplayAllPokemon();
});

// Escutador pro menu de gerações
document.addEventListener('DOMContentLoaded', () => {
    const generations = document.getElementById('totalPokemon');
    generations.addEventListener('change', () => {
        localStorage.setItem('generations', generations.value);
        location.reload();
    });
});