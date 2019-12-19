import {loadImage} from "./loader.js"
let screen = document.getElementById("screen");

let screenCtx = screen.getContext("2d");

let keys = [];
window.addEventListener("keydown", evt => { if (keys.indexOf(evt.code) < 0) keys.push(evt.code); });
window.addEventListener("keyup", evt => { keys.splice(keys.indexOf(evt.code), 1); });

let currSpeed = 0;
let accel = 1;
let decel = -2;
let maxSpeed = 1;

onResize();

let sprites = [
    {
        name: "player",
        path: "./img/test_sprite_run.png",
        x: 64,
        y: screen.height / 3 * 2.2,
        width: 864 / 8,
        height: 280 / 2,
        index: 0
    },
    {
        name: "sky",
        path: "./img/sky.png",
        x: 0,
        y: 0,
        width: screen.height / 3 * 2,
        height: screen.height / 3 * 2,
        index: 0
    },
    {
        name: "city",
        path: "./img/city.png",
        x: 0,
        y: screen.height / 3,
        width: screen.height / 3,
        height: screen.height / 3,
        index: 0
    },
    {
        name: "street",
        path: "./img/street.png",
        x: 0,
        y: screen.height / 3 * 2,
        width: screen.height / 3,
        height: screen.height / 3,
        index: 0
    }
];

sprites.forEach(sprite => {
    loadImage(sprite.path)
    .then(img => {
        sprite.image = img;
    });
});

Promise.all([])
.then((player, sky, city, street) => {

});

function onResize() {
    screen.width = 800;// window.innerWidth;
    screen.height = 600;//window.innerHeight;
}

function loop(prevTime) {
    let currTime = Date.now();
    let deltaTime = (currTime - prevTime) / 1000;
    
    currSpeed += keys.indexOf("KeyD") < 0 ? decel * deltaTime : accel * deltaTime;
    if (currSpeed > maxSpeed) currSpeed = maxSpeed;
    else if (currSpeed < 0) currSpeed = 0;

    screenCtx.clearRect(0, 0, screen.width, screen.height);

    if (sprites.length === 4) {
        sprites[1].x -= 0.2 * currSpeed;
        sprites[2].x -= 1 * currSpeed;
        sprites[3].x -= 10 * currSpeed;

        if (sprites[1].x < -sprites[1].width) sprites[1].x += sprites[1].width;
        if (sprites[2].x < -sprites[2].width) sprites[2].x += sprites[2].width;
        if (sprites[3].x < -sprites[3].width) sprites[3].x += sprites[3].width;

        for (let i = 1; i < sprites.length; i++) {
            let x = sprites[i].x;
            while (x < screen.width) {
                if (sprites[i].image !== undefined)
                screenCtx.drawImage(sprites[i].image, x, sprites[i].y, sprites[i].width, sprites[i].height);
                x += sprites[i].width;
            }
        }
        
        if (sprites[0].image !== undefined)
        screenCtx.drawImage(sprites[0].image, Math.floor(sprites[0].index) * sprites[0].width, 0, sprites[0].width, sprites[0].height, sprites[0].x, sprites[0].y, sprites[0].width, sprites[0].height);
        sprites[0].index += 0.2 * currSpeed;
        if (sprites[0].index >= 8) sprites[0].index = 0;
    }

    screenCtx.fillText(`FPS: ${deltaTime * 1000}`, 10, 20);

    requestAnimationFrame(() => loop(currTime));
}

requestAnimationFrame(() => loop(Date.now()));

window.onresize = onResize;