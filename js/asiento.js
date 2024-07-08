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
    localStorage.getItem("seats") ||
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

function renderSeats() {
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
          updateSeats([rowIndex, seatIndex]);
        }
      });
      seatButton.appendChild(seatElement);
      seatButton.appendChild(seatText);
      seatsContainer.appendChild(seatButton);
    });
  });
}

function updateSeats(newSeatIndex) {
  const seat = document.getElementById(`icon-${newSeatIndex[0]}-${newSeatIndex[1]}`);
  seat.classList.remove("free");
  seat.classList.add("selected");
  seats[newSeatIndex[0]][newSeatIndex[1]] = "reserved";
}

function saveSeats() {
  localStorage.setItem("seats", JSON.stringify(seats));
}

console.log(seats);

renderSeats();
