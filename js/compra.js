const purchase = JSON.parse(
  localStorage.getItem(`purchase-${getQueryParam("purchase")}`)
);

function onBack() {
  window.location.href = "/index.html";
}

if (!purchase) {
  const main = document.getElementById("main");
  main.innerHTML = "";
  const purchaseError = document.createElement("h1");
  purchaseError.textContent = "No se ha realizado ninguna compra con id proporcionado.";
  const back = document.createElement("button");
  back.textContent = "Volver a la página principal";
  back.classList.add("btn");
  back.id = "back";
  back.addEventListener("click", onBack);
  main.appendChild(purchaseError);
  main.appendChild(back);
}

const movie = getMovie(purchase.movie);

const purchaseId = document.getElementById("purchase-id");
const movieTitle = document.getElementById("movie-title");
const movieTime = document.getElementById("movie-time");
const movieSeats = document.getElementById("movie-seats");
const movieTotal = document.getElementById("movie-total");
const backButton = document.getElementById("back");

purchaseId.textContent = purchase.id;
movieTitle.textContent = movie.title;
movieTime.textContent = purchase.time;
movieSeats.textContent = purchase.seats;
movieTotal.textContent = purchase.total;
backButton.addEventListener("click", onBack);