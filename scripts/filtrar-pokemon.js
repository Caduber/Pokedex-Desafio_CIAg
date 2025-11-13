// Filtro da busca
function filterPokemon() {
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      
        const pokemonName = card.getAttribute('data-pokemon-name');
        const pokemonId = card.getAttribute('data-pokemon-id');
        const pokemonFirstType = card.getAttribute('data-pokemon-fristType');
        const pokemonSecondType = card.getAttribute('data-pokemon-secondType');

        const matchesSearch = pokemonId.includes(searchTerm) || pokemonName.includes(searchTerm) || pokemonFirstType.includes(searchTerm) || (pokemonSecondType.includes(searchTerm));
        card.style.display = matchesSearch ? 'flex' : 'none';

    });
}

// Escutador da pesquisa
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        if (localStorage.getItem('isLoaded') == 'true') {
            filterPokemon();
        }
    });
});
