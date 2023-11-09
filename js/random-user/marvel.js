const photo = document.querySelector('.photo');
const nameCharacter = document.querySelector('.name');

const inputSearch = document.querySelector('.input_search');
const form = document.querySelector('.form');
const noResultsFound = document.querySelector('.strong');
const noResultsHeading = document.querySelector('.no_results');
const defaultMessage = document.querySelector('.default_message');

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');


let characters = [];
let currentCharacter;

const searchCharacter = async (character) => {
    const resp = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=${character}`);
    const { data } = await resp.json();

    photo.classList.add('hidden');
    defaultMessage.classList.remove('hidden');
    nameCharacter.classList.add('hidden');

    currentCharacter = 0;
    characters = [...data.results];

    if (characters.length === 0) {
        noResultsHeading.classList.remove('hidden');
        noResultsFound.textContent = character;
        return;
    }


    if (characters.length > 1) {
        prevButton.classList.remove('opacity-0', 'disabled');
        nextButton.classList.remove('opacity-0', 'disabled');
    }

    if (characters.length === 1) {
        prevButton.classList.add('opacity-0', 'disabled');
        nextButton.classList.add('opacity-0', 'disabled');
    }

    photo.classList.remove('hidden');
    defaultMessage.classList.add('hidden');
    nameCharacter.classList.remove('hidden');

    showData();

}
const showData = () => {
    const character = characters[currentCharacter];
    photo.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    nameCharacter.textContent = character.name;
}

prevButton.addEventListener('click', () => {
    currentCharacter--;
    if (currentCharacter < 0) currentCharacter = characters.length - 1;

    showData();
});

nextButton.addEventListener('click', () => {
    currentCharacter++;
    if (currentCharacter === characters.length) currentCharacter = 0;

    showData();

});

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

inputSearch.addEventListener('keyup', (event) => {
    noResultsHeading.classList.add('hidden')
    if (event.code !== 'Enter') return;

    searchCharacter(event.target.value);
});
