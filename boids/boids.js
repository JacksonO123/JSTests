'use strict';

let canvas;

class Boid {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r - rotation in radians
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const speed = 4;
    const randomRotation = Math.random() * Math.PI * 2;
    this.rotation = randomRotation;
    this.defaultTop = new Vector(0, -10);
    this.defaultLeft = new Vector(-5, 5);
    this.defaultRight = new Vector(5, 5);
    this.velocity = new Vector(0, speed);
    this.rotateTo(randomRotation);
  }
  rotate(rad) {
    this.rotation += rad;
    this.#setRotation();
  }
  rotateTo(rad) {
    this.rotation = rad;
    this.#setRotation();
  }
  #setRotation() {
    this.defaultTop.rotateTo(this.rotation);
    this.defaultLeft.rotateTo(this.rotation);
    this.defaultRight.rotateTo(this.rotation);
    this.velocity.rotateTo(this.rotation);
  }
  draw(c) {
    c.beginPath();
    c.fillStyle = '#3498db';
    c.moveTo(this.x + this.defaultTop.x, this.y + this.defaultTop.y);
    c.lineTo(this.x + this.defaultRight.x, this.y + this.defaultRight.y);
    c.lineTo(this.x + this.defaultLeft.x, this.y + this.defaultLeft.y);
    c.lineTo(this.x + this.defaultTop.x, this.y + this.defaultTop.y);
    c.fill();
    c.closePath();
  }
  move() {
    this.x -= this.velocity.x;
    this.y -= this.velocity.y;
    if (this.x < -10) {
      this.x = canvas.width + 10;
    }
    if (this.y < -10) {
      this.y = canvas.height + 10;
    }
    if (this.x > canvas.width + 10) {
      this.x = -10;
    }
    if (this.y > canvas.height + 10) {
      this.y = -10;
    }
  }
}

class Vector {
  constructor(x, y, r = 0) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.rotation = r;
  }
  rotate(rad) {
    // rotate vector
    this.rotation += rad;
    // rotate points
    this.x =
      this.startX * Math.cos(this.rotation).toFixed(5) -
      this.startY * Math.sin(this.rotation).toFixed(5);
    this.y =
      this.startX * Math.sin(this.rotation).toFixed(5) +
      this.startY * Math.cos(this.rotation).toFixed(5);
  }
  rotateTo(rad) {
    const diff = rad - this.rotation;
    this.rotate(diff);
  }
}

class BoidSimulation extends HTMLElement {
  constructor() {
    super();
    this.numBoids = 80;
    // this.numBoids = 1;
    this.frameRate = 60; // fps
  }
  connectedCallback() {
    // canvas init
    const cnv = h('canvas');
    canvas = cnv;
    window.addEventListener('resize', () => this.resizeCanvas(canvas));
    this.resizeCanvas(canvas);
    this.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // boid init
    let boids = [];
    this.initBoids(boids);
    this.render(ctx, boids);
  }
  render(c, boids) {
    setTimeout(() => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(c, boids);
      this.render(c, boids);
    }, 1000 / this.frameRate);
  }
  initBoids(boids) {
    const width = canvas.width;
    const height = canvas.height;
    for (let i = 0; i < this.numBoids; i++) {
      const x = random(width);
      const y = random(height);
      boids.push(new Boid(x, y));
    }
  }
  draw(c, boids) {
    for (let i = 0; i < boids.length; i++) {
      boids[i].move();
      boids[i].draw(c);
    }
  }
  resizeCanvas(c) {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
}

function h(type) {
  return document.createElement(type);
}

function random(range) {
  return Math.floor(Math.random() * range);
}

function pythag(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

customElements.define('boid-simulation', BoidSimulation);
