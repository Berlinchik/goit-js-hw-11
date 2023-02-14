const url = 'https://jsonplaceholder.typicode.com/todos';

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

function fetchTodos() {
    console.log('Start fetchTodos');

    return delay(2000)
        .then(() => fetch(url))
        .then(response => response.json());
}

fetchTodos()
    .then(data => console.log(data))
    .catch(error => console.log(error));
