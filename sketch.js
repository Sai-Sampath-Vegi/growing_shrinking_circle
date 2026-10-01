const r = require("raylib");

const window = {
	width: 300,
	height: 300,
	title: "Growing and Shrinking Circle",
};

const FPS = 60;

const GROW = "GROW";
const SHRINK = "SHRINK";

const circle = {};

function getHalf(x) {
	return x / 2;
}

function getCircleMinRadius(windowDimension) {
	return windowDimension / 10;
}

function getCircleMaxRadius(windowDimension) {
	return getHalf(windowDimension);
}

function running() { return !r.WindowShouldClose(); }

function setup() {
	r.SetTraceLogLevel(r.LOG_NONE);
	r.InitWindow(window.width, window.height, window.title);
	r.SetTargetFPS(FPS);

	circle.x = getHalf(window.width);
	circle.y = getHalf(window.height);

	circle.minRadius = getCircleMinRadius(Math.min(window.width, window.height));
	circle.maxRadius = getCircleMaxRadius(Math.min(window.width, window.height));

	circle.radius = circle.minRadius;
	circle.mode = GROW;
}

function getUpdatedCircleRadius(circle) {
	if (circle.mode === GROW) return circle.radius + 1;
	if (circle.mode === SHRINK) return circle.radius - 1;
}

function getUpdatedCircleMode(circle) {
	if (circle.radius === circle.maxRadius) return SHRINK;
	if (circle.radius === circle.minRadius) return GROW;
	return circle.mode;
}

function update() {
	circle.radius = getUpdatedCircleRadius(circle);
	circle.mode = getUpdatedCircleMode(circle);
}

function draw() {
	r.BeginDrawing();

	r.ClearBackground(r.BLACK);

	r.DrawCircle(circle.x, circle.y, circle.radius, r.WHITE);

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