import './css/styles.css';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// console.log(refs.countryList);
// console.log(refs.countryInfo);

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputTarget, DEBOUNCE_DELAY));

// функція інпута
function onInputTarget(evt) {
  evt.preventDefault();
  // значення з інпуту. метод trim() видаляє останні і попередні пробіли
  const nameCountryInInput = evt.target.value.trim();

  // передаємо значення з інпуту в функцію пошуку країни
  // при успішному запиті виконуємо в then функцію створення розмітки
  fetchCountries(nameCountryInInput).then(country => {
    refs.countryList.innerHTML = buildMarkup(country);
  });

  // якщо пустий рядок, не виконувати пошук
  if (nameCountryInInput === '') {
    return;
  }
}

// функція запиту країн
function fetchCountries(name) {
  // властивості для фільтру
  const params = 'name,capital,population,flags,languages';
  // посилання для пошуку
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${params}`;
  0;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  // .then(data => console.log(data))
  // .catch(error => console.log(error));
}

// функція створення розмітки
function buildMarkup(countries) {
  return countries
    .map(
      country => `<li style="display: flex; align-items: center">
            <img src="${country.flags.svg}" alt="flag" width="40px" />
            <b style="margin-left: 5px">${country.name.official}</b>
          </li>`
    )
    .join('');
}
