// функція створення розмітки для багатьох країн
export const buildMarkup = countries => {
  return countries
    .map(
      country => `<li style="display: flex; align-items: center">
            <img src="${country.flags.svg}" alt="flag" width="40px" />
            <b style="margin-left: 5px">${country.name.official}</b>
          </li>`
    )
    .join('');
};

export const createCard = country => {
  return country.map(
    markup => `<div style="display: flex; align-items: center">
        <img
          src="${markup.flags.png}"
          width="70px"
          alt="flag"
        />
        <b style="font-size: 45px; margin-left: 10px">${
          markup.name.official
        }</b>
      </div>
      <ul style="list-style: none; margin-top: 15px">
        <li style="margin-bottom: 5px">
          <b style="font-size: 27">Capital: ${markup.capital}</b>
        </li>
        <li style="margin-bottom: 5px">
          <b style="font-size: 27">Population: ${markup.population}</b>
        </li>
        <li><b style="font-size: 27">Languages: ${Object.values(
          markup.languages
        ).join(', ')}</b></li>
      </ul>`
  );
};
