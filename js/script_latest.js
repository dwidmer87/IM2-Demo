//_______________________________________________________________________________________
// AKTUELLSTE DATEN
//_______________________________________________________________________________________

const url_latest = 'https://api.openaq.org/v2/latest?limit=500&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dump_raw=false';
allData_latest = [];

//---------------------------------------------------------------------------------------
// Initialisierung API / Fetch
//---------------------------------------------------------------------------------------

async function fetchData(url_latest) {
    try {
        let response = await fetch(url_latest);
        let data = await response.json();
        return data;
        }

    catch (error) { 
        console.log(error);
    }
}

async function init_current(){
    let latestData = await fetchData(url_latest);
    allData_latest = await Promise.all(latestData.results.map(async (localbasedData) => {
        let airData = localbasedData;
        return airData;
        }));
    console.log(allData_latest);
    allData_latest.forEach(localbasedData => {
    createMarker(localbasedData);
    });
}
    init_current();

//---------------------------------------------------------------------------------------
// Marker mit Popup erstellen
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
    localbasedData.measurements.forEach(measurement => {
        measures += `<strong>${measurement.parameter.toUpperCase()}</strong>: ${measurement.value.toFixed(3)} ${measurement.unit}<br>`;
    });

    let city = localbasedData.city;
    if (localbasedData.city === null) 
        {city = localbasedData.location};

let marker = L.marker([localbasedData.coordinates.latitude, localbasedData.coordinates.longitude], {icon: locationPin}).addTo(map).bindPopup(`<h3 class="popup_title">${city}</h3>${measures} <br> <i>Last Update: ${localbasedData.measurements[0].lastUpdated}</i>`);
}
