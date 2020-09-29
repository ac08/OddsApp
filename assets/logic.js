$(document).ready(function() {
    // SportsData.io API Key 
    let sportDataApiKey = "?key=fae190a3b3c447529f443fead4937d4c";
    
    // SportsData.io API - Endpoint URLs
    let bettingFuturesMarketURL = "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST?key=fae190a3b3c447529f443fead4937d4c"
    let gameDate                = "2020-09-29";
    let gamesOddsbyDateURL      = "https://api.sportsdata.io/v3/mlb/odds/json/GameOddsByDate/" + gameDate + sportDataApiKey;
    let scheduleURL             = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2020POST?key=fae190a3b3c447529f443fead4937d4c"
    let newsURL                 = "https://api.sportsdata.io/v3/mlb/scores/json/News?key=fae190a3b3c447529f443fead4937d4c"
    // SportsData.io API - Ajax Call - Populate World Series Odds
    $.ajax({
        "async": true,
        "crossDomain": true,
        // "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
    // Declare Data Response 
    let data = response[0];
    console.log(data);

    // Declaring variables outside of forEach, but not working inside or outside forEach loop
    // Select list-group associated with #worldSeriesWinner
    let listGroup = $("#worldSeriesWinnerListGroup");
    // Create list-item for teamName
    let listItem  = $("<li>");
    // Create list-item-span for teamOdds
    let listItemSpan = $("<span>");

    // Name of Betting Market Type and As Of Date - Can be placed on #worldSeriesWinner
    let worldSeriesWinner = data.BettingMarkets[11].BettingBetType;
    let worldSeriesWinnerTime = data.BettingMarkets[11].BettingBetType.Updated;
    $('#worldSeriesWinner').text(worldSeriesWinner + " as of " + worldSeriesWinnerTime);
    
    // Configure Array for World Series Odds
    let worldSeriesOddsArr = data.BettingMarkets[11].BettingOutcomes;
    // Configure Array for World Series Odds at DraftKings sportsbook (Id=7)
    let draftKingsWSOddsArr  = [];
    // Loop through Array for World Series Odds and push "line" to World Series Odds at DraftKings sportsbook Array
    worldSeriesOddsArr.forEach(function(el) {
        let sportsBook = el.SportsBook;
        if (sportsBook.SportsbookID === 7) {
            draftKingsWSOddsArr.push(el);
        };
    });
    console.log(draftKingsWSOddsArr);
    // Loop through Array for World Series Odds at DraftKings sportsbook and retrieve Team Name and AmPayout
    draftKingsWSOddsArr.forEach(function (el) {
        // Declare Variable for Team Name on each loop
        let teamName  = el.Participant;
        // Declare Variable for American Payout on each loop
        let teamOdds  = el.PayoutAmerican;
        // Set text of list-item to teamName
        listItem.text(teamName); 
        // Add classes to list-item
        listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
        // Set text of list-item-span to teamOdds
        listItemSpan.text(teamOdds); 
        // Add classes to list-item-spand
        listItemSpan.addClass("badge badge-dark");
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
    });

    });

// SportsData.io API - Ajax Call - Populate Pre-Game Odds
// SportsData.io API - Ajax Call - Populate Live Odds
    // Check for Pending Games
        // the game should have started (Game.DateTime < Now) or Status === InProgress
        // the game DOES NOT include one of statuses: (Game.Status not in ('Final', 'Postponed', 'Canceled'))
    // If any games are pending 
        // if there any pending games, then continue, otherwise, quit
    // Box Scores 
        // If any games match the criteria, you'll want to pull the latest data for each game. You can do this one of two ways.
            // Using distinct days from games that are pending, pull the latest box score data by date (API Call: Box Scores by Date)
            // Loop the pending games and pull the latest box score data by GameID (API Call: Box Score)
    // Delta Box Scores 
        // One more important note, instead of using the full box score data, you can use the delta box scores instead. 
        // This will allow you to get even faster real time integration, since you will only receive player stats that 
        // have changed in the last X minutes. (more information on the Box Scores by Date Delta APIs below)

    let inProgressArr = [];
    let scheduledArr  = [];
    let completedArr  = [];


    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": gamesOddsbyDateURL,
        "method": "GET"
    }).done(function (response) {
        console.log(response);

        response.forEach(function(el) {
            if (el.Status === "InProgress") {
                inProgressArr.push({
                    gameID:      el.GameId,
                    home:        el.HomeTeamName,
                    away:        el.AwayTeamName
                });
            } else if (el.Status === "Scheduled" || "Postponed" || "Canceled" ) {
                scheduledArr.push({
                    gameID:      el.GameId,
                    home:        el.HomeTeamName,
                    homeMLOdds:  el.PregameOdds[0].HomeMoneyLine,
                    away:        el.AwayTeamName,
                    awayMLOdds:  el.PregameOdds[0].AwayMoneyLine,
                    overUnder:   el.PregameOdds[0].OverUnder,
                    overOdds:    el.PregameOdds[0].OverPayout,
                    underOdds:   el.PregameOdds[0].UnderPayout 
                });
            } else {
                completedArr.push({
                    gameID:      el.GameId,
                    home:        el.HomeTeamName,
                    homeFnScore: el.HomeTeamScore,
                    away:        el.AwayTeamName,
                    awayFnScore: el.AwayTeamScore
                });
            };
        });
        console.log(inProgressArr);
        console.log(scheduledArr);
        console.log(completedArr);
    });



});





// WorldSeries Odds selection works outside of forEach function
// let listGroup = $('#worldSeriesWinnerListGroup');
// console.log(listGroup);
// let listItem = $("<li>");
// listItem.text("Pirates");
// listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
// let listItemSpan = $("<span>");
// listItemSpan.text("200");
// listItemSpan.addClass("badge badge-dark");
// listGroup.append(listItem.append(listItemSpan));



// set an attr on score-card of gameID? 