import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);

const square1 = createBox(100, 300);
const anim1 = gsap.to(square1, { pixi: { rotation: 360 }, duration: 1, paused: true })
animateClick(square1, anim1);

const square2 = createBox(300, 300);
const anim2 = gsap.to(square2, { pixi: { blur: 10 }, duration: 1, paused: true })
animateClick(square2, anim2);

const square3 = createBox(500, 300);
const anim3 = gsap.to(square3, { pixi: { skewX: 50 }, duration: 1, paused: true })
animateClick(square3, anim3);

const square4 = createBox(700, 300);
const anim4 = gsap.to(square4, { pixi: { tint: 0xff0000 }, duration: 1, paused: true })
animateClick(square4, anim4);

app.stage.addChild(square1, square2, square3, square4);

function createBox(x: number, y: number) {
    const box = new PIXI.Graphics();
    box.beginFill(0xffffff)
    box.drawRect(0, 0, 100, 100);
    box.endFill();
    box.interactive = true;

    box.pivot.set(50, 50);
    box.position.set(x, y);

    return box;
}

function animateClick(box: PIXI.Graphics, anim: GSAPTween) {
    //does not respond on first click
    box.on('pointertap', () => {
        if (anim.reversed()) {
            anim.play();
        } else {
            anim.reverse();
        }
    })
}