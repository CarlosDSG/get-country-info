const input = document.getElementById('inputLetter');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	dataValidation(input.value);
});

const getData = () => {};

function dataValidation(letter) {
	const regex = /^[A-Za-z]$/;
	const validLetter = regex.test(letter);

	if (validLetter && letter.length === 1) {
		return getData();
	}
}
