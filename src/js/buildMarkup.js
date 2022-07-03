// функція створення розмітки
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
