//Variables
// Selecting elements by class ( done with class because mobile only will have the same content)
const currentLocationElement = document.querySelectorAll('.currentLocation');
const currentDateElement = document.querySelectorAll('.currentDate');
const temperatureElement = document.querySelectorAll('.temperature');
const windElement = document.querySelectorAll('.wind');
const humidElement = document.querySelectorAll('.humid');

const searchInput=document.querySelector('#searchInput')
const searchButton=document.querySelector('#searchButton')
const searchUl = document.querySelector('#searchedLocations')
 // A default location to display weather
let cityName = 'Connecticut';
// Functions
//API CALL
async function weather() {
    const APIkey = '17177cbd46b16334c70811527b0a120f';
    const Url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;
    try {
        // 
        const response = await fetch(Url);
        const data = await response.json();

        // Assigning TextContent
        currentLocationElement.forEach(Element => {
            const location = `${data.city.name}`;
            Element.textContent = location;
        });

        for (let index = 0; index < 5; index++) {
            const date = new Date(data.list[index].dt_txt);
            currentDateElement[index].textContent = date.toLocaleDateString('en-US');

            const temperature = Math.round(data.list[index].main.temp - 273.15);
            temperatureElement[index].textContent = `Temperature: ${temperature} °C`;

            const wind = Math.round(data.list[index].wind.speed * 2.237);
            windElement[index].textContent = `Wind: ${wind} mph`;

            const humidity = data.list[index].main.humidity;
            humidElement[index].textContent = `Humidity: ${humidity}`;
        }
    } catch (error) {
        console.log(error);
    }

}
weather();


// Function to handle search button click
searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value.trim();
    if (inputValue !== '') {
        const searchLi = document.createElement('li');
        // searchLi.setAttribute('class','searchedList') Save for later when I need to style
        searchLi.textContent = inputValue;
        cityName = inputValue;
        weather();
        searchInput.value = '';

        searchUl.appendChild(searchLi);

        searchLi.addEventListener('click', () => {
            cityName = searchLi.textContent;
            weather();
        });
    }
});
