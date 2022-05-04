class ThreeBox extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const front = h('div');
		front.classList.add('front');
		const back = h('div');
		back.classList.add('back');
		const left = h('div');
		left.classList.add('left');
		const right = h('div');
		right.classList.add('right');
		const top = h('div');
		top.classList.add('top');
		const bottom = h('div');
		bottom.classList.add('bottom');
		this.appendChild(front);
		this.appendChild(back);
		this.appendChild(left);
		this.appendChild(right);
		this.appendChild(top);
		this.appendChild(bottom);
	}
}

const h = (type) => {
	return document.createElement(type);
}

const get = (id) => {
	return document.getElementById(id);
}

customElements.define('three-box', ThreeBox);

function toggleRotate() {
	const box = document.getElementById('3d-box');
	box.classList.toggle('rotating');
}

const perspective = +getComputedStyle(document.body).getPropertyValue('--perspective').match(/(\d+)/g)[0];

addEventListener('mousemove', e => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const distX = ((width/2) - e.clientX) * -1;
	const distY = (height/2) - e.clientY;
	const degX = (Math.atan(distX/perspective)) * (180/Math.PI);
	const degY = (Math.atan(distY/perspective)) * (180/Math.PI);
	get('3d-box').style.transform = `rotateY(${degX}deg) rotateX(${degY}deg)`;
});