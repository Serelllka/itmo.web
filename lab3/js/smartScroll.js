var canvas
var ctx

class FrameSet {
    constructor(source, sourceHeight, sourceWidth, frameHeight, frameWidth) {
        this.source = source
        this.frameH = frameHeight
        this.frameW = frameWidth
        this.sourceH = sourceHeight
        this.sourceW = sourceWidth
    
        this.currX = 0
        this.currY = 0
    }

    getCurrentFrame() {
        return [this.currX, this.currY, this.frameW, this.frameH]
    }

    nextFrame() {
        this.currX += this.frameH
        if (this.currX == this.sourceH) {
            this.currX = 0
            this.currY += this.frameW
        }
        if (this.currY == this.sourceW) {
            this.currY = 0
        }
    }
}

class Frame {
    constructor(ctx, source, height, width) {
        this.ctx = ctx
        this.height = height
        this.width = width
        this.frameSet = source
    }

    render = (posX, posY) => {
        posX = posX - (this.width / 2)
        posY = posY - (this.height / 2)

        var img = new Image();
        img.src = this.frameSet.source

        var pos = this.frameSet.getCurrentFrame()

        this.frameSet.nextFrame()
        this.ctx.drawImage(img, pos[0], pos[1], pos[2], pos[3], posX, posY, this.width, this.height)
    }
}

startRendering = () => {
    let X = event.clientX;
    let Y = event.clientY;
    
    frameSet = new FrameSet("../res/images/Smoke15Frames.png", 768, 1280, 256, 256)
    frame = new Frame(ctx, frameSet, 256, 256)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame.render(X, Y)
}

window.onclick = startRendering;

initCanvas = () => {
    canvas = document.getElementById("canvas1")
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
} 

window.onload = () => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
}