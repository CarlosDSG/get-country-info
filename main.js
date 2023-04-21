({
	plugins: ['jsdom-quokka-plugin'],
	jsdom: {
		file: 'index.html',
	},
});

const input = document.getElementById('inputLetter');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	dataValidation(input.value);
});

const getData = () => {
	fetch('https://restcountries.com/v3.1/all')
		.then((resolve) => resolve.json())
		.then((countriesData) => {
			countriesData.forEach((country, index) => {
				console.log(country.name.common);
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

function dataValidation(letter) {
	const regex = /^[A-Za-z]$/;
	const validLetter = regex.test(letter);

	if (validLetter && letter.length === 1) {
		return getData();
	}
}
