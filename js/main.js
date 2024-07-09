const movies = [
  {
    id: 0,
    title: "Wall-e",
    duration: "2h 22min",
    genre: ["Animación", "Aventura", "Familia"],
    image: "img/walle.webp",
    description:
      "A heartwarming story about a robot named Wall-e who falls in love with another robot while cleaning up Earth.",
    times: [
      new Date("2022-01-01T14:00:00"),
      new Date("2022-01-01T17:00:00"),
      new Date("2022-01-01T20:00:00"),
      new Date("2022-01-01T23:00:00"),
    ],
  },
  {
    id: 1,
    title: "Spiderman 2",
    duration: "2h 55min",
    genre: ["Acción", "Aventura", "Superheores"],
    image: "img/spiderman.webp",
    description:
      "Spiderman must face his own personal demons while battling powerful villains to protect the city.",
    times: [
      new Date("2022-01-01T14:00:00"),
      new Date("2022-01-01T17:00:00"),
      new Date("2022-01-01T20:00:00"),
      new Date("2022-01-01T23:00:00"),
    ],
  },
  {
    id: 2,
    title: "Avengers: Infinite War",
    duration: "2h 45min",
    genre: ["Acción", "Aventura", "Superheores"],
    image: "img/Avengers.jpg",
    description:
      "The Avengers team up to stop the powerful Thanos from collecting all the Infinity Stones and wiping out half of the universe.",
    times: [
      new Date("2022-01-01T14:00:00"),
      new Date("2022-01-01T17:00:00"),
      new Date("2022-01-01T20:00:00"),
      new Date("2022-01-01T23:00:00"),
    ],
  },
];

function getQueryParam(param) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function getMovie(index = "") {
  if (index) {
    return movies[index];
  }

  return movies[getQueryParam("movie")];
}

function getFormattedTime() {
  const time = getQueryParam("time");
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

const movieContainer = document.getElementById("movies-container");

document.addEventListener("DOMContentLoaded", function () {
  if (!movieContainer) {
    return;
  }
  movies.forEach((movie, index) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(${movie.image})`;
    const movieImg = document.createElement("img");
    movieImg.src = movie.image;
    movieImg.alt = `${movie.title} poster`;
    movieDiv.appendChild(movieImg);

    const movieInfoDiv = document.createElement("div");
    movieInfoDiv.classList.add("movie-info");

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;
    movieInfoDiv.appendChild(movieTitle);

    const movieDuration = document.createElement("p");
    movieDuration.textContent = `${movie.duration} - ${movie.genre.join(", ")}`;
    movieInfoDiv.appendChild(movieDuration);

    const movieLink = document.createElement("a");
    movieLink.href = `pages/horarios.html?movie=${index}`;
    movieLink.classList.add("btn");
    movieLink.textContent = "Comprar boletos";
    movieInfoDiv.appendChild(movieLink);

    movieDiv.appendChild(movieInfoDiv);

    movieContainer.appendChild(movieDiv);
  });
});
