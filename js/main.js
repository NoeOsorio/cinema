const movies = [
    {
        title: 'Wall-e',
        duration: '2h 22min',
        genre: ['Animación', 'Aventura', 'Familia'],
    },
    {
        title: 'Spiderman 2',
        duration: '2h 55min',
        genre: ['Acción', 'Aventura', 'Superheores'],
    },
    {
        title: 'Avengers: Infinite War',
        duration: '2h 45min',
        genre: ['Acción', 'Aventura', 'Superheores'],
    }
]

function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getMovie() {
    const index = getQueryParam('movie');
    return movies[index];
}