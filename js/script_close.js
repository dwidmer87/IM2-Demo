//_______________________________________________________________________________________
// DATEN IN DER NÄHE
//_______________________________________________________________________________________

//---------------------------------------------------------------------------------------
// Position des Nutzers ermitteln
//---------------------------------------------------------------------------------------
allData_close = [];

function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error("Deine Position konnte nicht ermittelt werden."));
        }
    });
}

//---------------------------------------------------------------------------------------
// Karte initialisieren
//---------------------------------------------------------------------------------------
let map;

async function init_map(latitude_user, longitude_user){
    map = L.map('map', {zoomSnap: 0}, {wheelPxPerZoomLevel: 1}).setView([latitude_user, longitude_user], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        doubleClickZoom: true,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

//---------------------------------------------------------------------------------------
// Marker-Funktion definieren
//---------------------------------------------------------------------------------------

var locationPin = L.icon({
    iconUrl: '../img/pin.png',
    shadowUrl: '../img/pin_shadow.png',

    iconSize:     [20, 50], // size of the icon
    shadowSize:   [28, 35], // size of the shadow
    iconAnchor:   [1, 32], // point of the icon which will correspond to marker's location
    shadowAnchor: [1, 15],  // the same for the shadow
    popupAnchor:  [12, -35] // point from which the popup should open relative to the iconAnchor
});

function createMarker(localbasedData) {
    let measures = ``;
    localbasedData.parameters.forEach(average => {
        measures += `<strong>${average.parameter.toUpperCase()}</strong>: ${average.average.toFixed(3)} ${average.unit}<br>`;
    });

    let city = localbasedData.name;
    // if (localbasedData.city === null) 
    //     {city = localbasedData.name};

    let marker = L.marker([localbasedData.coordinates.latitude, localbasedData.coordinates.longitude],{icon: locationPin}).addTo(map).bindPopup(`<h3 class="popup_title">"${city}"<br>im Durchschnitt:</h3>${measures}<br><i>Last Update: ${localbasedData.lastUpdated}</i>`);
}

//---------------------------------------------------------------------------------------
// Daten der API abrufen und Marker erstellen
//---------------------------------------------------------------------------------------

async function fetchData(url_close) {
    try {
        let response = await fetch(url_close);
        let data = await response.json();
        return data;
        }

    catch (error) { 
        console.log(error);
    }
}

async function init_close(){
    try {
        const position = await getPosition();
        let latitude_user = position.coords.latitude;
        let longitude_user = position.coords.longitude;
        console.log("Latitude: " + latitude_user + ", Longitude: " + longitude_user);
        let url_close =`https://api.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&coordinates=${latitude_user}%2C${longitude_user}&radius=25000&order_by=lastUpdated&dump_raw=false`;
        let closeData = await fetchData(url_close);
        allData_close = await Promise.all(closeData.results.map(async (localbasedData) => {
            let airData = localbasedData;
            return airData;
        }));
        console.log(allData_close);
        if (allData_close.length === 0) {
            console.log("No data available");
            alert("In deiner Nähe gibt es offenbar keine Messstationen.");
        }
        else {
            await init_map(latitude_user, longitude_user);
            allData_close.forEach(localbasedData => {
                createMarker(localbasedData);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

init_close();
