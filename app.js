const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(
	document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const colors = [
	"#16a085",
	"#27ae60",
	"#2980b9",
	"#8e44ad",
	"#2c3e50",
	"#f39c12",
	"#d35400",
	"#c0392b",
	"#bdc3c7",
	"#7f8c8d",
];

let isPainting = false;
let isFilling = false;
ctx.lineWidth = lineWidth.defaultValue;
ctx.lineCap = "round";

function startPainting() {
	isPainting = true;
}

function cancelPainting() {
	isPainting = false;
}

function onMouseMove(event) {
	if (isPainting) {
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.stroke();
		return;
	}
	ctx.beginPath();
	ctx.moveTo(event.offsetX, event.offsetY);
}

function onRangeChange(event) {
	ctx.lineWidth = lineWidth.value;
}

function onColorChange(event) {
	ctx.strokeStyle = event.target.value;
	ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
	const colorValue = event.target.dataset.color;
	ctx.strokeStyle = colorValue;
	ctx.fillStyle = colorValue;
	color.value = colorValue;
}

function onModeBtnClick(event) {
	if (isFilling) {
		isFilling = false;
		modeBtn.innerText = "Fill";
	} else {
		isFilling = true;
		modeBtn.innerText = "Draw";
	}
}

function onCanvasClick(event) {
	if (isFilling) {
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}

function onDestroyBtnClick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserBtnClick() {
	ctx.strokeStyle = "white";
	isFilling = false;
	modeBtn.innerText = "Fill";
}

function onFileChange(event) {
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);
	const img = new Image();
	img.src = url;
	img.onload = () => {
		ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		fileInput.value = null;
	};
}

function onDoubleClick(event) {
	const text = textInput.value;
	if (text.length > 0) {
		ctx.save();
		ctx.lineWidth = 1;
		ctx.font = "32px Serif";
		ctx.fillText(text, event.offsetX, event.offsetY);
		ctx.restore();
	}
}

function onSaveClick(event) {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "paint.png";
	link.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onRangeChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroyBtnClick);
eraserBtn.addEventListener("click", onEraserBtnClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);