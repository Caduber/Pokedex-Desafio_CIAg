// Filtro da busca
function filterPokemon() {
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      
        const pokemonName = card.getAttribute('data-pokemon-name');
        const pokemonId = card.getAttribute('data-pokemon-id');

        const matchesSearch = pokemonId.includes(searchTerm) || pokemonName.includes(searchTerm);
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
