let year = 1918
const currentYear = new Date().getFullYear();

let allTeams = {}

while(year <= currentYear) {
    console.log(year)
    // Get link - Date is Jan 20 because that it when the first games of lockout 2013 started
    const response_standings = await fetch("https://api-web.nhle.com/v1/standings/"+year+"-01-20");
    const data_standings = await response_standings.json();
    const standings = data_standings.standings;
    const teamsInStandings = standings.length

    for (let team = 0; team < teamsInStandings; team++) {
        let currentTeamName = standings[team].teamName.default
        let currentTeamAbbv = standings[team].teamAbbrev.default
        let currentTeamLogo = standings[team].teamLogo
        let currentTeamDict = {"name": currentTeamName, "logo": currentTeamLogo}

        addUniqueItem(currentTeamAbbv, currentTeamDict)
    }


    year = year + 1;
    //  Skip 2009 season because of nhl lockout
    if (year == 2009) {
        year = year + 1
    }

}

console.log(allTeams)

function addUniqueItem(key, value) {
    if (!allTeams.hasOwnProperty(key)) {
        allTeams[key] = value;
        console.log(`Added: ${key}`);
    } else {
        console.log(`Skipped (duplicate): ${key}`);
    }
  }