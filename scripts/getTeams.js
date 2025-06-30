// Set first year and get curent year
let year = 1918
const currentYear = new Date().getFullYear();

// Create dictionary to hold all team data
let allTeamsData = {}

// Loop through every year and get all teams from that year
while(year <= currentYear) {
    console.log(year)
    // Get link - Date is Jan 20 because all seasons had started by then
    const response_standings = await fetch("https://api-web.nhle.com/v1/standings/"+year+"-01-20");
    const data_standings = await response_standings.json();
    const standings = data_standings.standings;
    const teamsInStandings = standings.length

    // Get al teams and add unseen ones
    for (let team = 0; team < teamsInStandings; team++) {
        let currentTeamName = standings[team].teamName.default
        let currentTeamAbbv = standings[team].teamAbbrev.default
        let currentTeamLogo = standings[team].teamLogo
        let currentTeamDict = {"name": currentTeamName, "logo": currentTeamLogo}

        addUniqueItem(currentTeamAbbv, currentTeamDict)
    }

    // Increment year
    year = year + 1;
    //  Skip 2009 season because of nhl lockout (season not played)
    if (year == 2009) {
        year = year + 1
    }
}

// Write data out to file
import * as fs from 'fs';
const jsonString = JSON.stringify(allTeamsData, null, 4);

fs.writeFile('scripts/allTeamsData.json', jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('JSON data written to allTeamsData.json');
    }
});




// Only add unique items
function addUniqueItem(key, value) {
    if (!allTeamsData.hasOwnProperty(key)) {
        allTeamsData[key] = value;
        console.log(`Added: ${key}`);
    } else {
        // console.log(`Skipped (duplicate): ${key}`);
    }
}