let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

this.screen = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// this.mouse = {
//      x: screen.width / 2,
//      y: screen.height / 2
// }

class Ball {
  constructor(r, x, y, vx, vy, color) {
    // this.baser = 10;
    this.gravity = 1;
    this.friction = 0.8;
    this.r = r || 30;
    this.x = x || randommath(0 + this.r, window.innerWidth - this.r);
    this.y = y || randommath(0 + this.r, window.innerHeight - this.r);
    this.vx = vx || (Math.random() - 0.5) * 15;
    this.vy = vy || Math.random() * 20;
    this.color =
      color ||
      `rgba(${Math.floor(Math.random() * 255)} , ${Math.floor(
        Math.random() * 255
      )} , ${Math.floor(Math.random() * 255)})`;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    if (this.y + this.r + this.vy >= screen.height) {
      this.vy = -this.vy * this.friction;
      this.vx = -this.vx * this.friction;
    } else {
      this.vy += this.gravity;
    }
    if (
      this.x + this.r + this.vx >= screen.width ||
      this.x - this.r + this.vx <= 0
    ) {
      this.vx = -this.vx;
    }

    this.x += this.vx;
    this.y += this.vy;

    // if(this.x + this.r > window.innerWidth || this.x - this.r < 0 ){
    //     this.vx = -this.vx
    // }
    // if(this.y + this.r > window.innerHeight || this.y - this.r < 0){
    //     this.vy = -this.vy
    // }
    // this.y += this.vy
    // this.x += this.vx
    this.draw();
  }
}

let balls = [];
for (let i = 0; i < 20; i++) {
  balls.push(new Ball());
}

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  balls.forEach((ball) => {
    ball.update();
  });
};

animate();

// window.addEventListener('click' , (e)=>{
//     ani.balls.push(new Ball(e.clientX,e.clientY))
// })

// window.addEventListener('mousemove' , (e)=>{
//     ani.balls.forEach(ball => {
//     let distance = Math.sqrt(Math.pow( e.clientX - ball.x , 2) + Math.pow( e.clientY - ball.y , 2))
//     if ( distance < 100 && ball.r < ball.baser * 2){
//         ball.r += 2
//     }else if(ball.r > ball.baser){
//         ball.r -= 2
//     }

//     })
// })

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function randommath(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
