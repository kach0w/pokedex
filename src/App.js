const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 898; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    console.log(promises);
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name[0].toUpperCase() + result.name.substring(1),
            image: result['sprites']['other']['official-artwork']['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokemon) => `
        <li class="card">
            <a href="#">${pokemon.name}</a>
            <img class="card-image" src="${pokemon.image}"/>
           <!-- <h2 class="card-title"></h2> -->
            <p class="card-subtitle">Type: ${pokemon.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
