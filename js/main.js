let screen = document.getElementById("screen");

screenCtx = screen.getContext("2d");

let keys = [];
window.addEventListener("keydown", evt => { if (keys.indexOf(evt.code) < 0) keys.push(evt.code); });
window.addEventListener("keyup", evt => { keys.splice(keys.indexOf(evt.code), 1); });

let currSpeed = 0;
let accel = 1;
let decel = -2;
let maxSpeed = 1;

let sprites = [];
let images = [
    "./img/test_sprite_run.png",
    "./img/sky.png",
    "./img/city.png",
    "./img/street.png"
];

images.forEach(image => {

});

onResize();
let spritesheet = new Image();
spritesheet.onload = () => {
    let sprite = {
        image: spritesheet,
        x: 64,
        y: screen.height / 3 * 2.2,
        width: spritesheet.width / 8,
        height: spritesheet.height / 2,
        index: 0
    }
    sprites.push(sprite);

let sky = new Image();
sky.onload = () => {
    let sprite = {
        image: sky,
        x: 0,
        y: 0,
        width: screen.height / 3 * 2,
        height: screen.height / 3 * 2,
        index: 0
    }
    sprites.push(sprite);
}
sky.src = "./img/sky.png";

let city = new Image();
city.onload = () => {
    let sprite = {
        image: city,
        x: 0,
        y: screen.height / 3,
        width: screen.height / 3,
        height: screen.height / 3,
        index: 0
    }
    sprites.push(sprite);
}
city.src = "./img/city.png";

let street = new Image();
street.onload = () => {
    let sprite = {
        image: street,
        x: 0,
        y: screen.height / 3 * 2,
        width: screen.height / 3,
        height: screen.height / 3,
        index: 0
    }
    sprites.push(sprite);
}
street.src = "./img/street.png";
};
spritesheet.src = "./img/test_sprite_run.png";

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
                screenCtx.drawImage(sprites[i].image, x, sprites[i].y, sprites[i].width, sprites[i].height);
                x += sprites[i].width;
            }
        }
        
        screenCtx.drawImage(sprites[0].image, Math.floor(sprites[0].index) * sprites[0].width, 0, sprites[0].width, sprites[0].height, sprites[0].x, sprites[0].y, sprites[0].width, sprites[0].height);
        sprites[0].index += 0.2 * currSpeed;
        if (sprites[0].index >= 8) sprites[0].index = 0;
    }

    screenCtx.fillText(`FPS: ${deltaTime * 1000}`, 10, 20);

    requestAnimationFrame(() => loop(currTime));
}

requestAnimationFrame(() => loop(Date.now()));

window.onresize = onResize;