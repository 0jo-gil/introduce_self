const bgCanvas = document.querySelector('#bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
const story_canvas = document.querySelector('#story_canvas');
const storyCtx = story_canvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

size(bgCanvas);
size(story_canvas);

// canvas 리사이즈 이벤트
window.addEventListener('resize', resize);

// canvas 초기 사이즈 설정
function size(el){
    el.width = window.innerWidth;
    el.height = window.innerHeight;
}

function resize(){
    size(bgCanvas);
    size(story_canvas);
    init();
}

// canvas draw 객체
class Draw{
    constructor(canvas, x, y, dx, dy, radius, color){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.color = color;
    }

    // 원그리기 이벤트
    circle(){
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.canvas.filter = `blur(100px)`;
        this.canvas.fillStyle = this.color;
        this.canvas.fill();
    }

    // 원 움직임 이벤트
    update(){
        if(this.x + 300 > window.innerWidth || this.x - 150 < 0){
            this.dx = -this.dx;
        }
        if(this.y + 300 > window.innerHeight || this.y - 150 < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // this.draw();
        this.circle();
    }
}


let draw;
let draw2;

init();

// main 섹션 캔버스 호출
function init(){
    let radius = window.innerWidth / 3;
    let x = innerWidth - 500;
    let y = innerHeight - 500;

    let dx = 0.5;
    let dy = 0.5;

    let color = '#DCE5E1';

    draw = new Draw(bgCtx, x, y, dx, dy, radius, color);
}

// main 섹션 캔버스 원 움직임 애니메이션 호출
function animate(){
    requestAnimationFrame(animate);
    bgCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    draw.update();
}

animate();

// story 섹션 circle 호출
window.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;

    let color = "rgb(153,78,52)";

    storyCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    draw2 = new Draw(storyCtx, x, y, 0, 0, 500, color);

    draw2.circle();
});
