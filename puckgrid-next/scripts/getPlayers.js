import { readFile } from 'fs/promises';

// Read in all team data from file
const allTeamsData = await loadTeamData();

// Take out all team abbreviations
const allTeamAbbreviations = Object.keys(allTeamsData);

// Loop through all years and team abbreviations and get needed information
let year = 1917;
const currentYear = new Date().getFullYear();
let yearPlusOne = year + 1;
let yearStr = "";

// Loop through all years of all teamas to get players
while (yearPlusOne <= currentYear) {
    // Change year to string
    yearStr = year.toString() + yearPlusOne.toString();

    // Loop through all teams to get players
    for (const abbreviation of allTeamAbbreviations) {
        // Set link and get response from api
        const link = "https://api-web.nhle.com/v1/roster/" + abbreviation + "/" + yearStr
        let response_players = await fetch(link);

        // Check if link worked
        if(response_players.ok) {
            let data_players = await response_players.json();
            let forwards = data_players.forwards
            let defensemen = data_players.defensemen
            let goalies = data_players.goalies
            const playerIdList = getPlayerIds(forwards, defensemen, goalies)
            console.log("Success: " + abbreviation + " roster in " + yearStr);
            console.log(playerIdList)
        } else {
            console.log("ERROR: " + abbreviation + " did not exist in " + yearStr);
        }
    }

    // Increment years for next loop
    year = year + 1;
    yearPlusOne = yearPlusOne + 1;
}

// Get all player ids and add to list
function getPlayerIds(forwards, defensemen, goalies) {
    let i = 0;
    let playerIdList = [];

    // Forwards
    for (const forward of forwards) {
        playerIdList[i] = forward.id
        i = i + 1
    }

    // D
    for (const d of defensemen) {
        playerIdList[i] = d.id
        i = i + 1
    }

    // Goalies
    for (const goalie of goalies) {
        playerIdList[i] = goalie.id
        i = i + 1
    }

    return playerIdList
}

async function loadTeamData() {
    const data = await readFile('scripts/allTeamsData.json', 'utf-8');
    return JSON.parse(data);
}