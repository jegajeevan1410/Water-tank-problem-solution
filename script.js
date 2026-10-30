function calcWater(heights) {
  const n = heights.length;
  const left = [], right = [], water = [];

  let max = 0;
  for (let i = 0; i < n; i++) {
    max = Math.max(max, heights[i]);
    left[i] = max;               // tallest wall from the left
  }

  max = 0;
  for (let i = n - 1; i >= 0; i--) {
    max = Math.max(max, heights[i]);
    right[i] = max;              // tallest wall from the right
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    water[i] = Math.min(left[i], right[i]) - heights[i];
    total += water[i];
  }
  return { water, total };
}

const CELL = 40;
const NS = "http://www.w3.org/2000/svg";

function square(svg, col, level, maxH, color) {
  const r = document.createElementNS(NS, "rect");
  r.setAttribute("x", col * CELL);
  r.setAttribute("y", (maxH - level - 1) * CELL); // level 0 = bottom row
  r.setAttribute("width", CELL);
  r.setAttribute("height", CELL);
  r.setAttribute("fill", color);
  r.setAttribute("stroke", "#000");
  svg.appendChild(r);
}

function draw(heights, water) {
  const svg = document.getElementById("tank");
  svg.innerHTML = "";
  const maxH = Math.max(...heights, 1);
  svg.setAttribute("width", heights.length * CELL);
  svg.setAttribute("height", maxH * CELL);

  heights.forEach((h, col) => {
    for (let l = 0; l < h; l++) square(svg, col, l, maxH, "yellow");
    for (let l = h; l < h + water[col]; l++) square(svg, col, l, maxH, "#00b0f0");
  });
}

document.getElementById("btn").addEventListener("click", () => {
  const err = document.getElementById("error");
  err.textContent = "";
  const heights = document.getElementById("input").value
    .split(",").map(s => Number(s.trim()));

  if (heights.some(h => isNaN(h) || h < 0 || !Number.isInteger(h))) {
    err.textContent = "Please enter whole numbers 0 or more, separated by commas.";
    return;
  }
  const { water, total } = calcWater(heights);
  document.getElementById("result").textContent = `Output: ${total} Units`;
  draw(heights, water);
});