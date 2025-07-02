const { readFile } = require('fs/promises');
const { PrismaClient } = require('@prisma/client');

async function main() {
    // Import data base connection
    const prisma = new PrismaClient();

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
            const rosterLink = "https://api-web.nhle.com/v1/roster/" + abbreviation + "/" + yearStr
            let roster_response = await fetch(rosterLink);

            // Check if link worked
            if(roster_response.ok) {
                let data_players = await roster_response.json();
                let forwards = data_players.forwards
                let defensemen = data_players.defensemen
                let goalies = data_players.goalies
                const playerIdList = getPlayerIds(forwards, defensemen, goalies)
                console.log("Success: " + abbreviation + " roster in " + yearStr);
                //console.log(playerIdList)

                // Pull all player data
                for (const playerID of playerIdList) {
                    const playerLink = "https://api-web.nhle.com/v1/player/"+playerID+"/landing"
                    let player_response = await fetch(playerLink);

                    if(player_response.ok) {
                        let player = await player_response.json();

                        const playerData = {
                            fullName: player.firstName.default + " " + player.lastName.default,
                            position: player.position,
                            country: player.birthCountry,
                            team: abbreviation,
                            careerGoals: player.careerTotals.regularSeason.goals,
                            careerAssists: player.careerTotals.regularSeason.assists,
                            gamesPlayed: player.careerTotals.regularSeason.gamesPlayed,
                            heightInches: player.heightInInches,
                            weightPounds: player.weightInPounds,
                            shootsCatches: player.shootsCatches,
                            isActive: player.isActive,
                            picture: player.headshot,
                            birthDate: player.birthDate
                        };
                        
                    } else {
                        console.log("ERROR: " + playerID + " did not exist");
                    }
                } 

            } else {
                console.log("ERROR: " + abbreviation + " did not exist in " + yearStr);
            }


        }

        // Increment years for next loop
        year = year + 1;
        yearPlusOne = yearPlusOne + 1;
    }
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

main()
  .then(() => console.log("Script complete."))
  .catch((err) => console.error(err));