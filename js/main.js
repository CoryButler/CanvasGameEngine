let screen = document.getElementById("screen");

screenCtx = screen.getContext("2d");

let speeds = [2, 4, 8, 16, 32, 64];
let speed = 8;

let sprites = [];

onResize();
let spritesheet = new Image();

spritesheet.onload = () => {
    let sprite = {
        image: spritesheet,
        x: 64,
        y: 0,//screen.height / 6 * 4,
        width: spritesheet.width / 8,
        height: spritesheet.height / 2,
        index: 0
    }

    sprites.push(sprite);
};

spritesheet.src = "./img/test_sprite_run.png";

let rects = [
    { x: screen.width - speeds[0], y: screen.height / 6 * 0, width: screen.width / 2, height: screen.height / 6, style: "red" },
    { x: screen.width - speeds[1], y: screen.height / 6 * 1, width: screen.width / 2, height: screen.height / 6, style: "orange" },
    { x: screen.width - speeds[2], y: screen.height / 6 * 2, width: screen.width / 2, height: screen.height / 6, style: "yellow" },
    { x: screen.width - speeds[3], y: screen.height / 6 * 3, width: screen.width / 2, height: screen.height / 6, style: "green" },
    { x: screen.width - speeds[4], y: screen.height / 6 * 4, width: screen.width / 2, height: screen.height / 6, style: "blue" },
    { x: screen.width - speeds[5], y: screen.height / 6 * 5, width: screen.width / 2, height: screen.height / 6, style: "purple" },
    { x: 64, y: screen.height / 6 * 4, width: 32, height: 64, style: "black" }
];

function onResize() {
    screen.width = 800;// window.innerWidth;
    screen.height = 600;//window.innerHeight;
}

function loop() {
    screenCtx.clearRect(0, 0, screen.width, screen.height);

    for (let i = 0; i < speeds.length; i++) {
        rects[i].x -= speeds[i];
        if (rects[i].x + rects[i].width < 0) rects[i].x = screen.width;
    }

    //sprites[0].y += speed;
    //if (sprites[0].y < 0 || sprites[0].y > screen.height - sprites[0].height) speed *= -1;
    
    rects.forEach(rect => {
        screenCtx.fillStyle = rect.style;
        screenCtx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });  

    sprites.forEach(sprite => {
        screenCtx.drawImage(sprite.image, Math.floor(sprite.index) * sprite.width, 0, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width, sprite.height);
        sprite.index += 0.2;
        if (sprite.index >= 8) sprite.index = 0;
    });

    requestAnimationFrame(loop);
}

loop();

window.onresize = onResize;