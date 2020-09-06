const root = document.documentElement;
const pixelContainer = document.querySelector(".pixel-container");
const pixelSlider = document.querySelector("#pixel-count");
const resolutionIndicator = document.querySelector(".resolution");
resolutionIndicator.textContent = Math.pow(parseInt(pixelSlider.value), 2);
pixelSlider.addEventListener("input", renderCanvas);

function renderCanvas(event) {
  let resolution = Math.pow(pixelSlider.value, 2);
  let pixelCount = pixelContainer.childElementCount;

  if (event == undefined) {
    setPixelSize(pixelSlider.value);
    addPixels(pixelCount, resolution);
    return;
  }

  resolutionIndicator.textContent = Math.pow(parseInt(pixelSlider.value), 2);
  setPixelSize(event.target.value);
  if (pixelCount > resolution) {
    while (pixelCount > resolution) {
      pixelContainer.removeChild(pixelContainer.lastChild);
      pixelCount--;
    }
  } else addPixels(pixelCount, resolution);
}

function addPixels(pixelCount, resolution) {
  while (pixelCount < resolution) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixelContainer.appendChild(pixel);
    addListeners(pixel);
    pixelCount++;
  }
}

function setPixelSize(value) {
  const pixelSize = (19.7 / value).toFixed(3);
  root.style.setProperty("--pixel-size", pixelSize + "em");
}

var mousePos = false;

function setMousePos(option) {
  mousePos = option;
}

function addListeners(pixel) {
  pixel.addEventListener("mousedown", (e) => setMousePos(true));
  pixel.addEventListener("mouseup", (e) => setMousePos(false));
  pixel.addEventListener("mousemove", (e) => colorPixel(e.target));
}

function colorPixel(pixel) {
  if (mousePos) pixel.style.backgroundColor = "black";
}

renderCanvas();
