const photo = document.querySelector('#photo');
const nombre = document.querySelector('#nombre');
const telefono = document.querySelector('#telefono');
const total = document.querySelector('.total');

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const getUsersButton = document.querySelector('#getUsers');

let users = []
let currentUser = 1;
const quantityOfUsers = 5;

const getUsers = async () => {
    const resp = await fetch(`https://randomuser.me/api?results=${quantityOfUsers}`);
    const { results } = await resp.json();

    users = [...results];
    const [user] = users;

    photo.src = user.picture.medium;
    nombre.textContent = user.name.first;
    telefono.textContent = user.phone;
}

const showUser = () => {
    photo.src = users[currentUser].picture.medium;
    nombre.textContent = users[currentUser].name.first;
    telefono.textContent = users[currentUser].phone;
}

prevButton.addEventListener('click', () => {
    if (currentUser === 0) currentUser = users.length - 1;

    console.log(currentUser);
    showUser();
    currentUser--;

});

nextButton.addEventListener('click', () => {
    if (currentUser === quantityOfUsers) currentUser = 0;

    console.log(currentUser);
    showUser();
    currentUser++;

});

getUsersButton.addEventListener('click', () => {
    getUsers();
});
