// A starter template for side-scrolling games like our platformer
//The second to last level has you collect a heart where the last level you get the gun before going home
kaboom({
 width: 1400,
 height: 720,
 background: [0, 100, 200],
});

setGravity(1300);

// Load a player sprite
loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png");
loadSprite("moon", "https://kaboomjs.com/sprites/moon.png");
loadSprite("egg", "https://kaboomjs.com/sprites/egg.png");
loadSprite("grape", "https://kaboomjs.com/sprites/grape.png");
loadSprite("heart", "https://kaboomjs.com/sprites/heart.png");
loadSprite("gun", "https://kaboomjs.com/sprites/gun.png");
loadSprite("key", "https://kaboomjs.com/sprites/key.png");
loadSprite("lightening", "https://kaboomjs.com/sprites/lightening.png");
loadSprite("meat", "https://kaboomjs.com/sprites/meat.png");
loadSprite("mushroom", "https://kaboomjs.com/sprites/mushroom.png");
loadSprite("pineapple", "https://kaboomjs.com/sprites/pineapple.png");
loadSprite("watermelon", "https://kaboomjs.com/sprites/watermelon.png");
loadSprite("sun", "https://kaboomjs.com/sprites/sun.png");
loadSprite("cloud", "https://kaboomjs.com/sprites/cloud.png");
loadSprite("grass", "https://kaboomjs.com/sprites/grass.png");
loadSprite("door", "https://kaboomjs.com/sprites/door.png");
loadSprite("spike", "https://kaboomjs.com/sprites/spike.png");




function patrol() {
    return {
        id: "patrol",
        require: [ "pos", "area" ],
        dir: -1,
        add() {
            this.onCollide((obj, col) => {
                if (col.isLeft() || col.isRight()) {
                    this.dir = -this.dir;
                }
            });
        },
        update() {
            this.move(60 * this.dir, 0);
        },
    };
}

let allItems = false;
let haveGun = false;

scene("main", ({ level, score } = { level: 0, score: 0}) => {
    
    // Array of all level layouts
    const LEVELS = [
        [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                   $       >",
            ">          ==   ^  ====     >",
            ">            =====          >",
            ">        =                 =>",
            ">                           >",
            ">      =                    >",
            ">                   ==  ==  >",
            ">    =    ^         ==      >",
            ">               $ ==  ^   D >",
            "=============================",
        ],
        [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "========= ===================",
            "                             ",
            "                             ",
            "         -                   ",
        ],
        [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">               $     ^   D >",
            "=============================",
        ],
                [
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                           >",
            ">                         ===",
            ">                         ===",
            ">                         ===",
            ">            G            D =",
            "_____________________________",
        ],
    ];
    

    const currentLevel = level;
    let currentScore = score;

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
                sprite("watermelon"),
                area(),
                "item",
            ],
            "T": () => [
                sprite("pineapple"),
                area(),
                "item",
            ],
            "E": () => [
                sprite("meat"),
                area(),
                "item",
            ],
            "R": () => [
                sprite("grape"),
                area(),
                "item",
            ],
            "I": () => [
                sprite("egg"),
                area(),
                "item",
            ],
            "M": () => [
                sprite("mushroom"),
                area(),
                "item",
            ],
            "H": () => [
                sprite("heart"),
                area(),
                "item",
            ],
            "K": () => [
                sprite("key"),
                area(),
                "item",
            ],
            "G": () => [
                sprite("gun"),
                area(),
                "gun",
            ],
            "^": () => [
                sprite("ghosty"),
                area(),
                body(),
                patrol(),
                "enemy",
            ],
            ">": () => [
                sprite("cloud"),
                area(),
                body({ isStatic: true }),
                "cloud",
            ],
            "D": () => [
                sprite("door"),
                area(),
                "door",
            ],
            "-": () => [
                sprite("spike"),
                area(),
                body({ isStatic: true }),
                "spike",
            ],
            "_": () => [
                sprite("grass"),
                area(),
                body({ isStatic: true }),
                "grass",
            ],
        }
    };


    addLevel(LEVELS[currentLevel], levelConf);

        // --- Score & UI ---
    const scoreLabel =add([
        text("You need to collect items to go home"),
        pos(70,24),
        fixed(),
    ]);

    // --- The Player Character ---
    const player = add([
    sprite("ghosty"),
    pos(100, 100),
    area({ scale: 0.7 }),
    body(),
    "player",
    ]);


    // --- Movement Controls ---
    onKeyDown("left", () => { player.move(-200, 0); });
    onKeyDown("right", () => { player.move(200, 0); });
    onKeyPress("space", () => { if (player.isGrounded()) { player.jump(650); } });

    
	player.onCollide("item", (c) => {
		destroy(c)
        score+= 10;
        if (score == 150){
            scoreLabel.text = "Finish what you started";
            allItems = true
        }else{
            scoreLabel.text ="Items Collected: " + score;
        }
	})

    player.onCollide("gun", (c) => {
        destroy(c);
        haveGun = true;
    });

    player.onCollide("spike", (c) => {
        destroy(player);
        go("lose", {score: score});
    })

    player.onCollide("enemy", (enemy, col) => {
        if (col.isBottom()) {
            destroy(enemy);
            player.jump(300);
        } else {
            destroy(player);
            go("lose", {score: score});
        }
    });

    player.onCollide("door", () => {
        if (currentLevel + 1 < LEVELS.length) {
            go("main", { level: currentLevel + 1, score: score });
        } else {
            go("win", { score: score });
        }
    });

});

// --- Lose Scene ---
scene("lose", ({ score } = { score: 0 }) => {
    add([ text("Game Over\nItems Collected: " + score), pos(center()), anchor("center") ]);
    wait(2, () => { go("main", { level: 0, score: score}); });
});

scene("win", ({ score } = { score: 0 }) => {
    if (allItems == true && haveGun == true) {
        add([ text("You did what you had too\nItems Collected: " + score), pos(center()), anchor("center") ]);
    } else if (allItems == true && haveGun == false) {
        add([ text("Mercy\nItems Collected: " + score), pos(center()), anchor("center") ]);
    } else if (allItems == false && haveGun == true) {
        add([ text("Why do you keep running, only to fail\nItems Collected: " + score), pos(center()), anchor("center") ]);
    } else {
        add([ text("You Win, but you didn't collect all items!\nItems Collected: " + score), pos(center()), anchor("center") ]);
    }
    wait(60, () => { go("main", { level: 0, score: score}); });
});

go("main");