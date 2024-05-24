//_______________________________________________________________________________________
// SUCHE NACH PARAMETERN
//_______________________________________________________________________________________

allData_parameters = [];

//---------------------------------------------------------------------------------------
// Initialisierung API / Fetch
//---------------------------------------------------------------------------------------
async function fetchData(url_parameters) {
    try {
        let response = await fetch(url_parameters);
        let data = await response.json();
        return data;
        }

    catch (error) { 
        console.log(error);
    }
}

async function init_parameters(){
    markers.clearLayers();
    let url_parameters = `https://api.openaq.org/v2/measurements?date_from=2024-04-23T00%3A00%3A00Z&date_to=2024-04-30T20%3A08%3A00Z&limit=2000&page=1&offset=0&sort=desc&parameter=${wantedParameter}&radius=1000&order_by=datetime`;
    let parameterData = await fetchData(url_parameters);
    allData_parameters = await Promise.all(parameterData.results.map(async (localbasedData) => {
        let airData = localbasedData;
        return airData;
        }));
    console.log(allData_parameters);
    if (allData_parameters.length === 0) {
        console.log("No data available");
        alert("Zum gewünschten Parameter gibt es offenbar keine Daten.");
    }
    else {
    allData_parameters.forEach(localbasedData => {
        createMarker(localbasedData);
        }
    );}
}

//---------------------------------------------------------------------------------------
// Auswahlfunktion
//---------------------------------------------------------------------------------------
const selectBox = document.querySelector('#wantedParameter');

selectBox.addEventListener('change', function(){
    wantedParameter = selectBox.value;
    init_parameters();
});

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

let markers = L.layerGroup().addTo(map); // Erstellen Sie eine Marker-Gruppe

function createMarker(localbasedData) {
    let city = localbasedData.city;
    if (localbasedData.city === null) 
    {city = localbasedData.location;}
    
    let marker = L.marker([localbasedData.coordinates.latitude, localbasedData.coordinates.longitude], {icon: locationPin}).bindPopup(`<h3 class="popup_title">${city}</h3><strong>${localbasedData.parameter.toUpperCase()}:</strong> ${localbasedData.value}${localbasedData.unit} <br><br><i>Last Update: ${localbasedData.date.utc}</i>`);
    markers.addLayer(marker); // Fügen Sie den Marker zur Gruppe hinzu
}