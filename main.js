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
	document.getElementById('result').innerHTML = '';
	fetch(url)
		.then((response) => response.json())
		.then((countriesData) => {
			const countryData = countriesData
				.filter((country) => country.name.common.startsWith(letter.toUpperCase()))
				.sort(() => Math.random() - 0.5)
				.slice(0, 3);

			countryData.forEach((country) => {
				// Se recorren los lenguajes en caso de haber mas de uno mostrar todos en el body
				let languageList = '';
				Object.values(country.languages).forEach((language) => {
					languageList += `
					<li>${language}</li>`;
				});

				document.getElementById('result').innerHTML += `
			<div class="country-card">
			  <img class="country-img" src="${country.flags.png}">
			  <div class="card-container__text">
			  <h3 class="country-name">${country.name.common}</h3>
			  <p class="country-capital"><b>Capital</b>: ${country.capital}</p>
			  <p> <b>Currency:</b> ${Object.values(country.currencies)[0].name}</p>
			  <div>
			  <h6>Languages:</h6>
			  <ul class="country-language">${languageList}</ul> 
			  </div>
			  </div>
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
