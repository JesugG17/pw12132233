
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input');
const charactersContainer = document.querySelector('.character_container');
const noResultsHeading = document.querySelector('.no_results');
const noResults = document.querySelector('.strong');
const loaderContainer = document.querySelector('.loader_container');

const startRenderCharacters = async () => {
    const character = inputSearch.value;
    if (character.length === 0) return;

    removeAllItems();
    loaderContainer.classList.remove('hidden');
    loaderContainer.firstElementChild.classList.remove('hidden');

    const characters = await searchCharacter(character);

    loaderContainer.classList.add('hidden');
    loaderContainer.firstElementChild.classList.add('hidden');


    if (characters.length === 0) {
        noResultsHeading.classList.remove('hidden');
        noResults.textContent = character;
    }

    console.log(characters);

    for (let i = 0; i < characters.length; i++) {

        const character = characters[i];

        const li = document.createElement('li');
        li.classList.add('character_item');
        li.innerHTML = `
                <img src=${character.thumbnail.path + '.' + character.thumbnail.extension} alt="Character img">
                <div>
                    <h4>${character.name}</h4>
                    <p>${character.description.length === 0 ? 'no description availble' : character.description}</p>
                    <strong>Comics: ${character.comics.available}</strong>
                </div>
        `
        charactersContainer.append(li);
    }

}

const searchCharacter = async (character) => {
    const resp = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=${character}`);
    const { data } = await resp.json();
    return data.results;
}

const removeAllItems = () => {
    const allElements = charactersContainer.children;
    const elementsToRemove = [];
    for (let i = 2; i < allElements.length; i++) {
        elementsToRemove.push(allElements[i]);
    }

    console.log(elementsToRemove);

    elementsToRemove.forEach(element => {
        charactersContainer.removeChild(element);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!noResultsHeading.classList.contains('hidden')) {
        noResultsHeading.classList.add('hidden');
    }
    startRenderCharacters();
    inputSearch.value = '';
});