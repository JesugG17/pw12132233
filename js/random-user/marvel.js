

const photo = document.querySelector('.photo');
const nameCharacter = document.querySelector('.name');
const total = document.querySelector('.total');


const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const getCharactersButton = document.querySelector('.getCharacters');

const limitInput = document.querySelector('.limit');

let characters = []
let limit = 10;
let currentCharacter = 0;

const initCharacters = async () => {
    const resp = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&limit=${limit}`);
    const { data } = await resp.json();
    characters = [...data.results];
    showData();
}

const showData = () => {
    const character = characters[currentCharacter];
    photo.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    nameCharacter.textContent = character.name;
    total.textContent = `${currentCharacter + 1} / ${limit}`;
}


prevButton.addEventListener('click', () => {
    currentCharacter--;
    if (currentCharacter < 0) currentCharacter = limit - 1;

    showData();
});

nextButton.addEventListener('click', () => {
    currentCharacter++;
    if (currentCharacter === characters.length) currentCharacter = 0;
    showData();
});

getCharactersButton.addEventListener('click', () => {
    initCharacters();
});

limitInput.addEventListener('keyup', (event) => {
    const value = event.target.value;
    if (value.length === 0) return;

    limit = value;
    total.textContent = `1 / ${limit}`;
});