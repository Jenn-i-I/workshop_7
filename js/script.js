const nimiBtn = document.querySelector("#nimiBtn");
const kaikkiBtn = document.querySelector("#kaikkiBtn");
const jsondata = document.querySelector("#jsondata");

var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" , "city":"London" },' +
'{ "firstName":"Anna" , "lastName":"Smith" , "city":"New York" },' +
'{ "firstName":"Peter" , "lastName":"Jones" , "city":"Paris" } ]}';

nimiBtn.addEventListener("click", function() {
    const data = JSON.parse(text);

    jsondata.textContent = "";

    for (let i = 0; i < data.employees.length; i++) {

        jsondata.textContent +=
        data.employees[i].firstName + " " + data.employees[i].lastName + ", ";
    };

});

kaikkiBtn.addEventListener("click", function () {
    const data = JSON.parse(text);

    jsondata.textContent = "";

    for (let i = 0; i < data.employees.length; i++) {
        jsondata.textContent += JSON.stringify(data.employees[i]) + ", ";
    };
});


//Harjoitus2

const lataaBtn = document.querySelector("#lataaBtn");
const parsiBtn = document.querySelector("#parsiBtn");
const rawdata = document.querySelector("#rawdata");

lataaBtn.addEventListener("click", async function() {
    const rData = await fetch("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750");
    const data = await rData.json();

    rawdata.textContent =JSON.stringify(data, null, 2);

});

parsiBtn.addEventListener("click", async function() {
    const rData = await fetch("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750");
    const data = await rData.json();

    rawdata.textContent = "";

    const newTable = document.createElement("table");

    const headerRow = newTable.insertRow();
    
    for (const key of Object.keys(data.Search[0])) {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.append(th);
    };

    for (const movie of data.Search) {
        const row = newTable.insertRow();

        for (const value of Object.values(movie)) {
            const cell = row.insertCell();
            cell.textContent = value;
        };
    };

    rawdata.append(newTable);

});



// Harjoitus 3

const haeBtn = document.querySelector("#haeBtn");
const weatherdata = document.querySelector("#weatherdata");

const city = document.querySelector("#city");
const citysearch = document.querySelector("#citysearch");
const searchBtn = document.querySelector("#search");

city.addEventListener("change", function() {
    console.log(city.value);
    });

haeBtn.addEventListener("click", async function() {  
    const kaupunki = city.value;

    const wData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&units=metric&lang=en&appid=610f01d0fa7589c4a07adc12a86f9bbc`);
    const data = await wData.json();

    console.log(data);

    const lämpötila = data.main.temp;
    const kosteus = data.main.humidity;
    const kuvaus = data.weather[0].description;

    weatherdata.textContent = "Lämpötila: " + lämpötila + " astetta. " + "Pilvisyys: " + kuvaus + ". " + "Ilmankosteus: " + kosteus + ".";
});

searchBtn.addEventListener("click", async function () {
    const kaupunki = citysearch.value;
    console.log(kaupunki);

    const wData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&units=metric&lang=en&appid=610f01d0fa7589c4a07adc12a86f9bbc`);
    const data = await wData.json();

    if (wData.ok) {
        const lämpötila = data.main.temp;
        const kosteus = data.main.humidity;
        const kuvaus = data.weather[0].description;

        weatherdata.textContent = "Lämpötila: " + lämpötila + " astetta. " + "Pilvisyys: " + kuvaus + ". " + "Ilmankosteus: " + kosteus + ".";
        } else {
            weatherdata.textContent = "Kaupunkia ei löytynyt.";
    };
    
});

