// Get teams from api and fetch their data
const response_teams = await fetch("https://api.nhle.com/stats/rest/en/team");
const data_teams = await response_teams.json();

// Extract data from json
const teams = data_teams.data;

// Create list to hold team abreviations
let teamAbbreviations = [];

// Loop through teams and extract abbreviation
let i = 0;
for (const team of teams) {
    teamAbbreviations[i] = team.triCode;
    i = i + 1;
}

// Remove the to be decided team abreviation
const itemToRemove = 'TBD';
teamAbbreviations = teamAbbreviations.filter(item => item !== itemToRemove);

// Loop through all years and team abbreviations and get needed information
let year = 1917;
let yearPlusOne = year + 1;
let yearStr = "";
const currentYear = new Date().getFullYear();

// Loop through all years of all teamas to get players
while (yearPlusOne <= currentYear) {
    // Change year to string
    yearStr = year.toString() + yearPlusOne.toString();
    console.log(yearStr);

    // Loop through all teams to get players
    i = 0;
    for (const abbreviation of teamAbbreviations) {
        // Set link and get response from api
        const link = "https://api-web.nhle.com/v1/roster/" + abbreviation + "/" + yearStr
        let response_players = await fetch(link);

        // Check if link worked
        if(response_players.ok) {
            let data_players = await response_players.json();
            let forwards = data_players.forwards
            let defenceman = data_players.defenseman
            let goalies = data_players.goalies
            console.log(forwards);
        } else {
            console.log("ERROR");
        }
        i = i + 1;
    }

    // Increment years for next loop
    year = year + 1;
    yearPlusOne = yearPlusOne + 1;
}





