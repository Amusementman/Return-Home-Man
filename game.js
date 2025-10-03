// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1400,
 height: 720,
 background: [0, 100, 200],
});

setGravity(1200);

// Load a player sprite
loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png");
loadSprite("moon", "https://kaboomjs.com/sprites/moon.png");

scene("main", ({ level } = { level: 0 }) => {

    // Array of all level layouts
    const LEVELS = [
        [
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                             ",
            "                $            ",
            "=============================",
        ],

    ];

    const currentLevel = level;

    // Configure what each symbol in the level layout means.
    const levelConf = {
        tileWidth: 47,
        tileHeight: 47,
        tiles: {
            " ": () => [],
            "=": () => [
                rect(47, 47),
                color(230, 223, 237),
                area(),
                body({ isStatic: true }),
                "platform",
            ],
            "$": () => [
                sprite("moon"),
                area(),
                "moon",
            ],
        }
    };

    addLevel(LEVELS[currentLevel], levelConf);

    // --- The Player Character ---
    const player = add([
    sprite("ghosty"),
    pos(100, 100),
    area({ scale: 0.7 }),
    body(),
    "player",
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

    //--Moon Collecting Logic--
    player.onCollide("moon", (moon) => {
        destroy(moon);
    });

});

go("main");