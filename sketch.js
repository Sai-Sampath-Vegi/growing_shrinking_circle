const r = require("raylib");

const windowWidth = 300;
const windowHeight = 300;
const windowTitle = "Growing and Shrinking Circle";

const FPS = 60;

const GROW = "GROW";
const SHRINK = "SHRINK";

const circleMinRadius = getCircleMinRadius(windowWidth);
const circleMaxRadius = getCircleMaxRadius(windowWidth);

let circleRadius = circleMinRadius;
let circleMode = GROW;

function getHalf(x) {
	return x / 2;
}

function running() { return !r.WindowShouldClose(); }

function setup() {
	r.InitWindow(windowWidth, windowHeight, windowTitle);
	r.SetTargetFPS(FPS);
}

function getUpdatedCircleRadius(circleMode, currentRadius) {
	if (circleMode === GROW) return currentRadius + 1;
	if (circleMode === SHRINK) return currentRadius - 1;
}

function getUpdatedCircleMode(circleRadius, circleMode, circleMinRadius, circleMaxRadius) {
	if (circleRadius === circleMaxRadius) return SHRINK;
	if (circleRadius === circleMinRadius) return GROW;
	return circleMode;
}

function getCircleMinRadius(windowDimension) {
	return windowDimension / 10;
}

function getCircleMaxRadius(windowDimension) {
	return getHalf(windowDimension);
}

function update() {
	circleRadius = getUpdatedCircleRadius(circleMode, circleRadius);
	circleMode = getUpdatedCircleMode(circleRadius, circleMode, circleMinRadius, circleMaxRadius);
}

function draw() {
	const circleX = getHalf(windowWidth);
	const circleY = getHalf(windowHeight);

	r.BeginDrawing();

	r.ClearBackground(r.BLACK);

	r.DrawCircle(circleX, circleY, circleRadius, r.WHITE);

	r.EndDrawing();
}

function teardown() { r.CloseWindow(); }

module.exports = {
	running,
	setup,
	update,
	draw,
	teardown,
}