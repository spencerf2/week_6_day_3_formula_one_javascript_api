const form = document.querySelector('#seasonAndRoundInfoForm');

form.addEventListener('submit', setSeasonAndRound)

function setSeasonAndRound(event) {
    event.preventDefault();
    let season = document.querySelector('#season');
    let round = document.querySelector('#round');
    let jsonData = getData(season, round);
    loadData(jsonData);
}

const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season.value}/${round.value}/driverStandings.json`)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)
}

// Create Constants to hold DOM Elements
const DOMElements = {
    racerList : '.racer-list',
    racerHeaders: '.racer-headers'
}

// Creation of the Ranger List HTML
const createList = (position, name, nationality, sponsor, points) => {
    const htmlTableRow = `<tr>
                    <th scope="row">${position}</th>
                    <td>${name}</td>
                    <td>${nationality}</td>
                    <td>${sponsor}</td>
                    <td>${points}</td>
                 </tr>`
    document.querySelector(DOMElements.racerList).insertAdjacentHTML('beforeend', htmlTableRow)
}

// Function to Load Data and Display HTML
const loadData = async (jsonData) => {
    const racers = await jsonData;
    const htmlTableHeader = `<tr>
                                 <th scope="col">#</th>
                                 <th scope="col">Name</th>
                                 <th scope="col">Nationality</th>
                                 <th scope="col">Sponsor</th>
                                 <th scope="col">Points</th>
                             </tr>`
    document.querySelector(DOMElements.racerHeaders).insertAdjacentHTML('beforeend', htmlTableHeader)
    racers.forEach(racer => createList(racer.position, racer.Driver.givenName + ' ' + racer.Driver.familyName, racer.Driver.nationality, racer.Constructors[0].name, racer.points))
}

// racer.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position

// Function to Clear Data from HTML
const clearData = () => {
    document.querySelector(DOMElements.racerList).innerHTML = "";
    document.querySelector(DOMElements.racerHeaders).innerHTML = "";
}