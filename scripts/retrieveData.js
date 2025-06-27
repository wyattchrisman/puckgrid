// Get teams from api and fetch their data
const response_teams = await fetch("https://api.nhle.com/stats/rest/en/team");
const data_teams = await response_teams.json();

// Extract data from json
const teams =