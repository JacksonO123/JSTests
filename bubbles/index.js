class BubbleMain extends HTMLElement {
	constructor() { super(); }
}

class BubbleSecond extends HTMLElement {
	constructor() { super(); }
}

class BubbleBody extends HTMLElement {
	constructor() {
		super();
		this.clip = 'circle(20% at center)';
		this.clipScale = 10;
		this.returnTimeout = null;
	}
	connectedCallback() {
		const textWrapper = [...this.children].filter(el => el.tagName != 'BUBBLE-MAIN')[0];

		let entered = false;
		this.addEventListener('mouseenter', e => {
			clearTimeout(this.returnTimeout);
			if (!entered) {
				this.clipScale = 180;
				this.drawClipPath(textWrapper, `${e.offsetX}px ${e.offsetY}px`);
				entered = true;
			}
		});
		this.addEventListener('mouseleave', e => {
			this.clipScale = 10;
			this.drawClipPath(textWrapper, `${e.offsetX}px ${e.offsetY}px`);
			this.returnTimeout = setTimeout(() => {
				this.drawClipPath(textWrapper, 'top right');
			}, 1250);
			entered = false;
		});

		this.drawClipPath(textWrapper, 'top right');
	}
	drawClipPath(el, pos = 'top right') {
		el.style.clipPath = `circle(${this.clipScale}% at ${pos})`;
	}
}

const h = (type) => {
	return document.createElement(type);
}

const get = (id) => {
	return document.getElementById(id);
}

const parseBool = (str) => {
	if (str == 'true') return true;
	return false;
}

customElements.define('bubble-body', BubbleBody);
customElements.define('bubble-main', BubbleMain);
customElements.define('bubble-second', BubbleSecond);