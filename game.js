// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1400,
 height: 720,
 background: [0, 100, 200],
});

setGravity(1000);

// Load a player sprite
loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png");
loadSprite("moon", "https://kaboomjs.com/sprites/moon.png");
loadSprite("cloud", "https://kaboomjs.com/sprites/cloud.png");
loadSprite("grass", "https://kaboomjs.com/sprites/grass.png");
loadSprite("door", "https://kaboomjs.com/sprites/door.png");
loadSound("item", "/examples/sounds/score.mp3")




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

function addDialog() {
		const h = 160
		const pad = 16
		const bg = add([
			pos(0, height() - h),
			rect(width(), h),
			color(0, 0, 0),
			z(100),
		])
		const txt = add([
			text("", {
				width: width(),
			}),
			pos(0 + pad, height() - h + pad),
			z(100),
		])
		bg.hidden = true
		txt.hidden = true
		return {
			say(t) {
				txt.text = t
				bg.hidden = false
				txt.hidden = false
			},
			dismiss() {
				if (!this.active()) {
					return
				}
				txt.text = ""
				bg.hidden = true
				txt.hidden = true
			},
			active() {
				return !bg.hidden
			},
			destroy() {
				bg.destroy()
				txt.destroy()
			},
		}
	}


scene("main", ({ level } = { level: 0}) => {
    
    const FALL_DEATH = 2400
    let allItems = false
    const dialog = addDialog()

    // Array of all level layouts
    const LEVELS = [
        [
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                $     ^   D >",
            "==============================",
        ],
                    "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                            >",
            "                $     ^   D >",
            "==============================",
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
                "item",
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
        }
    };


    addLevel(LEVELS[currentLevel], levelConf);

        // --- Score & UI ---
    let score = 0;
    const scoreLabel =add([
        text("Collect the moons"),
        pos(24,24),
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

    	// action() runs every frame
	player.onUpdate(() => {
		camScale(1.5)
        // center camera to player
		camPos(player.pos)
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("lose")
		}
	})

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

	player.onCollide("item", (c) => {
		destroy(c)
        score+= 50;
        if (score == 50){
            scoreLabel.text = "Go through the door";
            allItems = true
        }else{
            scoreLabel.text ="Items Collected: " + score;
        }
	})

    player.onCollide("enemy", (enemy, col) => {
        if (col.isBottom()) {
            destroy(enemy);
            player.jump(300);
        } else {
            destroy(player);
            go("lose");
        }
    });

    player.onCollide("door", () => {
        if (hasKey) {
			if (levelIdx + 1 < levels.length) {
				go("main", levelIdx + 1)
			} else {
				go("win")
			}
		} else {
			dialog.say("you got no key!")
		}
    });

});

// --- Lose Scene ---
scene("lose", () => {
    add([ text("Game Over"), pos(center()), anchor("center") ]);
    wait(2, () => { go("main", { level: 0 }); });
});

// --- Win Scene ---
scene("win", () => {
    add([ text("You Win!"), pos(center()), anchor("center") ]);
    wait(2, () => { go("main", { level: 0 }); });
});

go("main");