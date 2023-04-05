const cols = document.querySelectorAll('.col');

// color update with the space bar   4 Step
document.addEventListener('keydown', event => {
	event.preventDefault(); // for 5 Step
	if (event.code.toLocaleLowerCase() == 'space') {
		setRandomCOlors()
	};
})

// Change the icons when you click   5 Step
document.addEventListener('click', event => {
	const type = event.target.dataset.type

	if (type == 'lock') {
		const node = event.target.tagName.toLocaleLowerCase() == 'i'
			? event.target
			: event.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type == 'copy') {
		copyToClickboard(event.target.textContent) //copy text
	}
})

// color generation   1 Step
function generateRandomColor() {
	const hexCodes = '0123456789ABCDEF';
	let color = '';
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return '#' + color
}

// copy the text when you click  6 Step
function copyToClickboard(text) {
	return navigator.clipboard.writeText(text)
}

// assign a color name to the text and button   2 Step
function setRandomCOlors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];// array to save the color

	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock'); // block the color under the closed icon
		const text = col.querySelector('h2');
		const button = col.querySelector('button');

		if (isLocked) {    // block the color under the closed icon
			colors.push(text.textContent)
			return
		}

		// save colors
		const color = isInitial
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random()

		if (!isInitial) {
			colors.push(color)
		}


		text.textContent = color;
		col.style.background = color;

		setTextColor(text, color);
		setTextColor(button, color);

		updateColorsHash(colors);
	})
}

// Change the color of the text in combination with the background using a third-party library    3 Step
function setTextColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? 'black' : 'white'
}

// saves colors when the page refreshes   7 Step
function updateColorsHash(colors = []) {
	document.location.hash = colors.map((col) => {

		return col.toString().substring(1)
	}).join('-');
}

// save colors
function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash.substring(1).split('-').map(color => '#' + color)
	}
	return []
}

setRandomCOlors(true)



