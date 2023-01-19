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

const circle = createCircle(100, 100)
animateCircle(circle, 'power1.out', 'power1.out', 'power1.out')
app.stage.addChild(circle);

const circle2 = createCircle(100, 300);
animateCircle(circle2, 'linear', 'elastic.out(1, 0.3)', 'elastic.in(1, 0.3)')
app.stage.addChild(circle2);

const circle3 = createCircle(100, 500);
animateCircle(circle3, 'sine.inOut', 'bounce.out', 'bounce.in')
app.stage.addChild(circle3);


function createCircle(x: number, y: number) {
    const circle = new PIXI.Graphics();
    circle.beginFill(0x000000)
    circle.drawCircle(0, 0, 50);
    circle.endFill();

    circle.position.set(x, y);

    return circle;
}

function animateCircle(circle: PIXI.Graphics, easeMove: string, easeScaleUp: string, easeScaleDown: string) {
    gsap.to(circle, { pixi: { x: 700 }, duration: 2, delay: 1, ease: easeMove });
    gsap.to(circle, { pixi: { scale: 1.5 }, duration: 1, delay: 1, ease: easeScaleUp });
    gsap.to(circle, { pixi: { scale: 1 }, duration: 1, delay: 2, ease: easeScaleDown });
}