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

const body = new PIXI.Graphics();
body.beginFill(0x000000)
body.drawRect(0, 0, 800, 600);
body.endFill();
body.interactive = true;

app.stage.addChild(body);

body.on('pointertap', (e) => {
    const color = ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0);
    const fireworks = firework(e.globalX, e.globalY, color);
    app.stage.addChild(fireworks);
})



function firework(x: number, y: number, color: number) {
    const fireworks = new PIXI.Container();
    fireworks.position.set(x, y);

    for (let i = 0; i < 100; i++) {
        particle(color, fireworks);
    }

    gsap.to(fireworks, {
        pixi: { y: '+=100' }, duration: 2, ease: 'power2.in',
        onComplete: () => fireworks.destroy()
    });

    return fireworks;
}

function particle(color: number, parent: PIXI.Container) {
    const particle = new PIXI.Graphics();
    particle.beginFill(0xffffff)
    particle.drawRect(0, 0, 4, 4);
    particle.endFill();

    particle.pivot.set(2, 2);

    gsap.fromTo(particle,
        { pixi: { scale: 0 } }, 
        { pixi: {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            rotation: 1440,
            scale: 2,
            blur: 1
        },
        duration: 2
    });

    gsap.to(particle, { pixi: { tint: color }, duration: 1 })
    gsap.to(particle, { pixi: { tint: 0 }, duration: 1, delay: 1 })

    parent.addChild(particle);
}