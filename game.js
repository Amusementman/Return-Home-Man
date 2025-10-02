// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1400,
 height: 720,
 background: [0, 100, 200],
});

setGravity(800);

// Load a player sprite
loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png");

// --- The Player Character ---
const player = add([
 sprite("ghosty"),
 pos(100, 100),
 area({ scale: 0.7 }),
 body(),
 "player",
]);

// --- The World ---
add([
 rect(width(), 48),
 pos(0, height() - 48),
 area(),
 body({ isStatic: true }),
]);

// --- Movement Controls ---
onKeyDown("left", () => {
 player.move(-200, 0);
});
onKeyDown("right", () => {
 player.move(200, 0);
});
onKeyPress("space", () => {
 if (player.isGrounded()) {
 player.jump(650);
 }
});