console.log(getMovie())

const movie = getMovie();

const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieDuration = document.getElementById("movie-duration");
const movieDescription = document.getElementById("movie-description");
const spots = document.getElementById("spots");

document.addEventListener("DOMContentLoaded", function () {

    moviePoster.src = `../${movie.image}`;
    moviePoster.alt = `${movie.title} poster`;
    movieTitle.textContent = movie.title;
    movieDuration.textContent = `${movie.duration} - ${movie.genre.join(", ")}`;
    movieDescription.textContent = movie.description;
    spots.innerHTML = "";
    movie.times.forEach((time) => {
        const timeDiv = document.createElement("a");
        timeDiv.classList.add("spot");
        timeDiv.href = "/pages/asientos.html?movie=" + movie.id + "&time=" + time.toISOString();
        timeDiv.textContent = time.toLocaleTimeString("es-MX", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });

        spots.appendChild(timeDiv);
    });

});