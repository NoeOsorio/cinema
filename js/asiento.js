const selectedSeats = new Set();
const ticketPrice = 100;
const movie = getMovie();


const formattedTime = getFormattedTime();
const recordName = `seats-${movie.id}-${formattedTime}`;

const rowMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
};

function getSeats() {
  return (
    JSON.parse(localStorage.getItem(recordName)) ||
    Array(8)
      .fill()
      .map(() =>
        Array(8)
          .fill()
          .map(() => "free")
      )
  );
}

const seats = getSeats();
const seatsContainer = document.getElementById("seats");
const seatsNumber = document.getElementById("seats-number");
const seatsSelected = document.getElementById("seats-selected");
const seatsTotal = document.getElementById("seats-total");
const ticketPriceElement = document.getElementById("ticket-price");
const addButton = document.getElementById("add-button");
const substractButton = document.getElementById("substract-button");
const btnReservar = document.getElementById("btn-reservar");

function renderSeats() {
  seatsContainer.innerHTML = "";
  seats.forEach((row, rowIndex) => {
    row.forEach((seat, seatIndex) => {
      const seatButton = document.createElement("button");
      const seatElement = document.createElement("span");
      const seatText = document.createElement("span");
      seatButton.id = `button-${rowIndex}-${seatIndex}`;
      seatElement.id = `icon-${rowIndex}-${seatIndex}`;
      seatText.id = `text-${rowIndex}-${seatIndex}`;
      seatElement.innerHTML = "event_seat";
      seatText.innerHTML = `${rowMap[rowIndex]}${seatIndex + 1}`;
      seatButton.classList.add("seat");
      seatElement.classList.add("material-symbols-outlined");
      seatElement.classList.add(seat);
      seatElement.addEventListener("click", () => {
        if (seat === "free") {
          updateSeats(
            [rowIndex, seatIndex],
            seatElement.classList.contains("selected")
          );
        }
      });
      seatButton.appendChild(seatElement);
      seatButton.appendChild(seatText);
      seatsContainer.appendChild(seatButton);
    });
  });
}

function updateSeats(newSeatIndex, isReserved = false) {
  if (isReserved) {
    selectedSeats.delete(`${newSeatIndex[0]}-${newSeatIndex[1]}`);
    const seat = document.getElementById(
      `icon-${newSeatIndex[0]}-${newSeatIndex[1]}`
    );
    seat.classList.remove("selected");
    seat.classList.add("free");
    seats[newSeatIndex[0]][newSeatIndex[1]] = "free";
  } else {
    if (selectedSeats.size >= seatsNumber.value) {
      alert("Ya seleccionaste todos los asientos");
      return;
    }
    selectedSeats.add(`${newSeatIndex[0]}-${newSeatIndex[1]}`);
    const seat = document.getElementById(
      `icon-${newSeatIndex[0]}-${newSeatIndex[1]}`
    );
    seat.classList.remove("free");
    seat.classList.add("selected");
    seats[newSeatIndex[0]][newSeatIndex[1]] = "reserved";
  }

  btnReservar.disabled = !(selectedSeats.size == seatsNumber.value);
  renderSelectedSeats();
}

function saveSeats() {
  renderSeats();
  localStorage.setItem(recordName, JSON.stringify(seats));
  savePurchase();
}

function savePurchase() {
  const purchase = {
    id: Math.floor(Math.random() * 100000),
    movie: movie.id,
    time: formattedTime,
    total: parseInt(seatsNumber.value) * ticketPrice,
    seats: Array.from(selectedSeats)
    .sort()
    .map((seat) => {
      const _seat = seat.split("-");
      return `${rowMap[_seat[0]]}${
        Number(_seat[1]) + 1
      }`;
    }),
    date: new Date().toISOString(),
  };
  localStorage.setItem(`purchase-${purchase.id}`, JSON.stringify(purchase));
  window.location.href = `compra.html?purchase=${purchase.id}`;
}

function addSeatNumber() {
  if (substractButton.disabled) {
    substractButton.disabled = false;
  }
  if (seatsNumber.value <= 7) {
    seatsNumber.value = parseInt(seatsNumber.value) + 1;
    renderTotalPrice();
  } else {
    addButton.disabled = true;
  }
  btnReservar.disabled = !(selectedSeats.size == seatsNumber.value);
}

function substractSeatNumber() {
  if (addButton.disabled) {
    addButton.disabled = false;
  }
  if (parseInt(seatsNumber.value) > 1) {
    seatsNumber.value = parseInt(seatsNumber.value) - 1;
    renderTotalPrice();
  }
  btnReservar.disabled = !(selectedSeats.size == seatsNumber.value);
  disableSubstractButton();
}

function renderTotalPrice() {
  seatsTotal.innerHTML = `$${parseInt(seatsNumber.value) * ticketPrice}`;
}

function disableSubstractButton() {
  if (seatsNumber.value == 1) {
    substractButton.disabled = true;
    return;
  }

  if (selectedSeats.size >= seatsNumber.value) {
    substractButton.disabled = true;
    return;
  } else if (seatsNumber.value > 1) {
    substractButton.disabled = false;
    return;
  }
}

function renderSelectedSeats() {
  disableSubstractButton();
  renderTotalPrice();
  seatsSelected.innerHTML = "";
  Array.from(selectedSeats)
    .sort()
    .forEach((seat, index) => {
      const _seat = seat.split("-");
      const seatElement = document.createElement("span");
      seatElement.innerHTML = `${index > 0 ? ", " : ""}${rowMap[_seat[0]]}${
        Number(_seat[1]) + 1
      }`;
      seatsSelected.appendChild(seatElement);
    });
}

const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieDuration = document.getElementById("movie-duration");

document.addEventListener("DOMContentLoaded", function () {
  moviePoster.src = `../${movie.image}`;
  moviePoster.alt = `${movie.title} poster`;
  movieTitle.textContent = movie.title;
  movieDuration.textContent = `${movie.duration} - ${movie.genre.join(", ")}`;
  if (time) {
    document.getElementById("time").textContent = formattedTime; // Mostrar en el HTML
  }
  //Main

  ticketPriceElement.innerHTML = ticketPrice;

  seatsNumber.value = 1;
  renderTotalPrice();
  renderSeats();
});
