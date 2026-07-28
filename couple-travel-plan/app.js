const routeStops = [
  { code: "KR", name: "Korea", note: "Starting in Korea", accent: "#78dff7", x: 11, y: 13 },
  { code: "UZ", name: "Uzbekistan", note: "Family and warm days", accent: "#83e39c", x: 25, y: 38 },
  { code: "KR", name: "Korea", note: "Back to Korea", accent: "#ff9aa9", x: 35, y: 20 },
  { code: "PH", name: "Philippines", note: "Philippines time", accent: "#ffe374", x: 62, y: 38 },
  { code: "BOR", name: "Boracay", note: "Boracay beach mood", accent: "#ffb45f", x: 82, y: 18 },
  { code: "MNL", name: "Manila", note: "Manila city stop", accent: "#ff83bd", x: 84, y: 46 },
  { code: "KHH", name: "Kaohsiung", note: "Kaohsiung, Taiwan", accent: "#9ce8f5", x: 85, y: 68 },
  { code: "KR", name: "Korea", note: "Final Korea prep", accent: "#78dff7", x: 41, y: 80 },
  { code: "AU", name: "Australia", note: "Then Australia", accent: "#83e39c", x: 68, y: 84 },
];

const track = document.querySelector("#routeTrack");
const plane = document.querySelector("#plane");
const activeNote = document.querySelector("#activeNote");
let activeIndex = 0;

function renderRoute() {
  track.innerHTML = routeStops
    .map(
      (stop, index) => `
        <button class="route-stop" style="--accent: ${stop.accent}" type="button" data-index="${index}">
          <span class="bubble">${stop.code}</span>
          <strong>${stop.name}</strong>
          <small>${index + 1}</small>
        </button>
      `,
    )
    .join("");

  track.querySelectorAll(".route-stop").forEach((button) => {
    button.addEventListener("click", () => {
      setActive(Number(button.dataset.index));
    });
  });
}

function setActive(index) {
  activeIndex = index;
  const stop = routeStops[index];
  document.querySelectorAll(".route-stop").forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });

  plane.style.left = `${stop.x}%`;
  plane.style.top = `${stop.y}%`;
  plane.style.transform = `rotate(${index * 24 - 10}deg)`;
  activeNote.textContent = stop.note;
}

renderRoute();
setActive(0);
