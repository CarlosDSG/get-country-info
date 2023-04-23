({
	plugins: ['jsdom-quokka-plugin'],
	jsdom: {
		file: 'index.html',
	},
});

const input = document.getElementById('inputLetter');
const form = document.getElementById('form');

let url = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,languages,currencies';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	dataValidation(input.value);
});

const getData = (letter) => {
	fetch(url)
		.then((resolve) => resolve.json())
		.then((countriesData) => {
			const countryData = countriesData
				.filter((country) => country.name.common.startsWith(letter.toUpperCase()))
				.sort(() => Math.random() - 0.5)
				.slice(0, 3);
			console.log(countryData);
			countryData.forEach((country) => {
				document.getElementById('result').innerHTML += `
				<div class="country-card">
				<img src="${country.flags.png}">
				<h3 class="country-name">${country.name.common}</h3>
				<p class="country-capital">${country.capital}</p>
				<p class="country-currency">${country.currencies.name}</p>
				<ul class="country-language">${country.languages}</ul>
				</div>
				`;
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
		return getData(letter);
	}
}

//Los datos a solicitar son: name,capital,flags,language,currencies
