const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flags.svg}" alt="flag" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const regionOptionBox = function (regionName) {
  return `<option value="${regionName}">${regionName}</option>`;
};

const countriesDiv = document.getElementById("countries");
const continentsBox = document.getElementById("continents");
let allCountriesArray = [];

fetch("https://restcountries.com/v3.1/all?fields=name,flags,region")
  .then(function (response) {
    return response.json();
  })
  .then(function (countries) {
    allCountriesArray = countries;

    fillTheContinentsBox();

    continentsBox.addEventListener("change", function (event) {
      const continent = event.target.value;

      const userChoiceContinent = allCountriesArray.filter(function (country) {
        return country.region === continent;
      });

      countriesDiv.innerHTML = "";
      userChoiceContinent.forEach((country) => {
        countriesDiv.innerHTML += cardTemplate(country);
      });
    });
  });

function fillTheContinentsBox() {
  let addedRegions = [];

  allCountriesArray.forEach((country) => {
    const region = country.region;

    if (!addedRegions.includes(region)) {
      addedRegions.push(region);

      continentsBox.innerHTML += regionOptionBox(region);
    }
  });
}
