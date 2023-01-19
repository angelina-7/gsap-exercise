import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Sprite } from "pixi.js";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);
init();

PIXI.Assets.addBundle('gears', {
    12: 'assets/gear12.png',
    16: 'assets/gear16.png',
    20: 'assets/gear20.png',
    24: 'assets/gear24.png',
    28: 'assets/gear28.png',
    40: 'assets/gear40.png',
});
PIXI.Assets.addBundle('controls', {
    gearbox: 'assets/gearbox.png',
    fast: 'assets/speed-fast.png',
    faster: 'assets/speed-faster.png',
    normal: 'assets/speed-normal.png',
    paused: 'assets/speed-paused.png',
})

async function init() {
    const assets = await PIXI.Assets.loadBundle('gears');
    const controls = await PIXI.Assets.loadBundle('controls');

    const [gear12, anim12] = spawnGear(assets[12], 300, 117, -360, 6);
    const [gear16, anim16] = spawnGear(assets[16], 542, 471, -360, 8);
    const [gear20, anim20] = spawnGear(assets[20], 212, 441, -360, 10);
    const [gear24, anim24] = spawnGear(assets[24], 676, 388, 360, 12);
    const [gear28, anim28] = spawnGear(assets[28], 142, 130, 360, 14);
    const [gear40, anim40] = spawnGear(assets[40], 400, 300, 360, 20);

    app.stage.addChild(gear40, gear12, gear28, gear16, gear24, gear20);

    const ui = new PIXI.Container();
    const box = PIXI.Sprite.from(controls.gearbox);
    box.anchor.set(0.5, 0.5);
    ui.addChild(box);

    const pauseBtn = PIXI.Sprite.from(controls.paused);
    pauseBtn.anchor.set(0.5, 0.5);
    pauseBtn.position.set(-57, 0);
    pauseBtn.interactive = true;
    pauseBtn.on('pointertap', () => {
        pause()
    })

    const normalBtn = PIXI.Sprite.from(controls.normal);
    normalBtn.anchor.set(0.5, 0.5);
    normalBtn.position.set(-18, 0);
    normalBtn.interactive = true;
    normalBtn.on('pointertap', () => {
        normal()
    })

    const fastBtn = PIXI.Sprite.from(controls.fast);
    fastBtn.anchor.set(0.5, 0.5);
    fastBtn.position.set(18, 0);
    fastBtn.interactive = true;
    fastBtn.on('pointertap', () => {
        fast()
    })

    const fasterBtn = PIXI.Sprite.from(controls.faster);
    fasterBtn.anchor.set(0.5, 0.5);
    fasterBtn.position.set(57, 0);
    fasterBtn.interactive = true;
    fasterBtn.on('pointertap', () => {
        faster()
    })

    ui.addChild(pauseBtn, normalBtn, fastBtn, fasterBtn);
    ui.position.set(400, 300);
    app.stage.addChild(ui)


    function pause() {
        anim12.timeScale(0)
        anim16.timeScale(0)
        anim20.timeScale(0)
        anim24.timeScale(0)
        anim28.timeScale(0)
        anim40.timeScale(0)
    }
    
    function normal() {
        anim12.timeScale(1)
        anim16.timeScale(1)
        anim20.timeScale(1)
        anim24.timeScale(1)
        anim28.timeScale(1)
        anim40.timeScale(1)
    }
    
    function fast() {
        anim12.timeScale(2)
        anim16.timeScale(2)
        anim20.timeScale(2)
        anim24.timeScale(2)
        anim28.timeScale(2)
        anim40.timeScale(2)
    }
    
    function faster() {
        anim12.timeScale(4)
        anim16.timeScale(4)
        anim20.timeScale(4)
        anim24.timeScale(4)
        anim28.timeScale(4)
        anim40.timeScale(4)
    }
    
}


function spawnGear(asset: PIXI.Texture, x: number, y: number, rotation: number, duration: number): [Sprite, GSAPTween] {
    const gear = PIXI.Sprite.from(asset);
    gear.anchor.set(0.5, 0.5);
    gear.position.set(x, y);

    const anim = gsap.to(gear, { pixi: { rotation }, duration, ease: 'linear', repeat: -1 });

    return [gear, anim];
}