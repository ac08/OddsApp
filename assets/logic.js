$(document).ready(function() {
    // SportsData.io API Key 
    let sportDataApiKey = "?key=fae190a3b3c447529f443fead4937d4c";
    
    // SportsData.io API - Endpoint URLs
    let bettingFuturesMarketURL = "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST?key=fae190a3b3c447529f443fead4937d4c"
    // will need to dynamically generate the dates in the correct format
    let gameDate                = "2020-09-30";
    let gamesOddsByDateURL      = "https://api.sportsdata.io/v3/mlb/odds/json/GameOddsByDate/" + gameDate + sportDataApiKey;
    let boxScoreDate            = "2020-SEP-30";
    let boxScoresByDateURL      = "https://api.sportsdata.io/v3/mlb/stats/json/BoxScores/" + boxScoreDate + sportDataApiKey;
    let teamsURL                = "https://api.sportsdata.io/v3/mlb/scores/json/teams" + sportDataApiKey
    // do not think we will want to use the scheduleURL endpoint as this will retrieve more games than we would like to render on the page
    // let scheduleURL             = "https://api.sportsdata.io/v3/mlb/scores/json/Games/2020POST?key=fae190a3b3c447529f443fead4937d4c"
    let stadiumURL              = "https://api.sportsdata.io/v3/mlb/scores/json/Stadiums" + sportDataApiKey;
    let newsURL                 = "https://api.sportsdata.io/v3/mlb/scores/json/News?key=fae190a3b3c447529f443fead4937d4c"
    // SportsData.io API - Ajax Call - Populate World Series Odds
    let worldSeriesOddsArr = [];
    let ALWinnerArr = [];
    let NLWinnerArr = [];

    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response 
        let data = response[0];
        // Name of Betting Market Type and As Of Date - Can be placed on #worldSeriesWinner
        let worldSeriesWinner     = data.BettingMarkets[11].BettingBetType;
        let worldSeriesWinnerTime = data.BettingMarkets[11].Updated;
        $('#worldSeriesWinner').text(worldSeriesWinner + " as of " + worldSeriesWinnerTime);

        // Configure Array for World Series Odds at DraftKings sportsbook (Id=7)
        let draftKingsWSOddsArr  = [];
        // Loop through Array for World Series Odds and push "line" to World Series Odds at DraftKings sportsbook Array (above)
        let tempArr = data.BettingMarkets[11].BettingOutcomes
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsWSOddsArr.push(tempEl);
            };
        });

        // Loop through Array for Worlds Series Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsWSOddsArr.forEach(function(dkWorldSeriesEl) {
            worldSeriesOddsArr.push({
                teamName: dkWorldSeriesEl.Participant,
                odds:     dkWorldSeriesEl.PayoutAmerican
            });
        });

        // Dynamically generate World Series Odds Drop-Down Screen
        worldSeriesOddsArr.forEach(function(worldSeriesOddsEl) {
        let teamName  = worldSeriesOddsEl.teamName;
        let odds      = worldSeriesOddsEl.odds;
        let listGroup = $("#worldSeriesWinner");
        // Create list-item for teamName
        let listItem  = $("<p>");
        // Add classes to list-item
        listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
        // Set text of list-item to teamName
        listItem.text(teamName);
        // Create list-item-span for odds
        let listItemSpan = $("<span>");
        // Add classes to list-item-spand
        listItemSpan.addClass("badge badge-dark");
        // Set text of list-item-span to odds
        listItemSpan.text(odds); 
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });





// SportsData.io API - Ajax Call - Populate Pre-Game Odds
// SportsData.io API - Ajax Call - Populate Live Odds -     FROM THE IMPLEMENTATIONS GUIDE ON WEBSITE
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

    // ajaxCall to gamesOddsByDateURL to sort games by game "status"; push in-progress games to global array inProgressArr, scheduled+ games to scheduledArr, and completed games to completedArr
    // when pushing game to specified array, it will carry a few properties that should be rendered on the page after final ajaxCall 
    $.ajax({
        "url": gamesOddsByDateURL,
        "method": "GET"
    }).done(function (response) {
        response.forEach(function(gameEl) {
            if (gameEl.Status === "InProgress") {
                inProgressArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName,
                    homeTeamID:          gameEl.HomeTeamId,
                    awayTeamName:        gameEl.AwayTeamName,
                    awayTeamID:          gameEl.AwayTeamId
                });
            } else if (gameEl.Status === "Scheduled" || gameEl.Status === "Postponed" || gameEl.Status === "Canceled" ) {
                scheduledArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName,
                    homeTeamID:          gameEl.HomeTeamId,
                    homeMLOdds:          gameEl.PregameOdds[0].HomeMoneyLine,
                    awayTeamName:        gameEl.AwayTeamName,
                    awayTeamID:          gameEl.AwayTeamId,
                    awayMLOdds:          gameEl.PregameOdds[0].AwayMoneyLine,
                    overUnder:           gameEl.PregameOdds[0].OverUnder,
                    overOdds:            gameEl.PregameOdds[0].OverPayout,
                    underOdds:           gameEl.PregameOdds[0].UnderPayout 
                });
            } else {
                completedArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName,
                    homeTeamID:          gameEl.HomeTeamId,
                    homeFnScore:         gameEl.HomeTeamScore,
                    awayTeamName:        gameEl.AwayTeamName,
                    awayTeamID:          gameEl.AwayTeamId,
                    awayFnScore:         gameEl.AwayTeamScore
                    
                });
            };
        });
        
        // ajaxCall to boxScoresByDateURL to get variety of data properties to add to either inProgressArr, scheduledArr, completedArr; match on gameID as defined in *Arr
        $.ajax({
        "url": boxScoresByDateURL,
        "method": "GET"
        }).done(function(response) {
            response.forEach(function(boxScoreEl) {
                let boxScoreGameID = boxScoreEl.Game.GameID;

                inProgressArr.forEach(function(gameEl) {
                    if (gameEl.gameID === boxScoreGameID) {
                        gameEl.homeTeamRuns = boxScoreEl.Game.HomeTeamRuns,
                        gameEl.awayTeamRuns = boxScoreEl.Game.AwayTeamRuns,
                        gameEl.inning       = boxScoreEl.Game.InningDescription,
                        gameEl.stadiumID    = boxScoreEl.Game.StadiumID,
                        gameEl.channel      = boxScoreEl.Game.Channel
                    };
                });

                scheduledArr.forEach(function(gameEl) {
                    if (gameEl.gameID === boxScoreGameID) {
                        gameEl.dateTime  = boxScoreEl.Game.DateTime,
                        gameEl.stadiumID = boxScoreEl.Game.StadiumID,
                        gameEl.channel   = boxScoreEl.Game.Channel
                    };
                });

                completedArr.forEach(function(gameEl) {
                    if (gameEl.gameID === boxScoreGameID) {
                        gameEl.winningPitcher = boxScoreEl.Game.WinningPitcherID,
                        gameEl.losingPitcher  = boxScoreEl.Game.LosingPitcherID
                    };
                });
            });
        });
            // ajaxCall to teamsURL to GET Team logo link (svg) and add to either inProgressArr, scheduledArr, completedArr; match on homeTeamID and awayTeamID as defined in *Arr
            $.ajax({
                url: teamsURL,
                method: "GET"
            }).done(function(response) {
                response.forEach(function(teamsEl) {
                    let teamID = teamsEl.TeamID;

                    inProgressArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl;
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl;
                        };
                    });

                    scheduledArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl;
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl;
                        };
                    });

                    completedArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl;
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl;
                        };
                    });
                });
            });


            // ajaxCall to stadiumURL to GET Stadium properties and add to scheduledArr; match on stadiumID as defined it scheduledArr - - - not working for me
            $.ajax({
                "url": stadiumURL,
                "method": "GET"
                }).done(function(response) {
                    response.forEach(function(stadiumEl) {
                        let stadiumStID = stadiumEl.StadiumID;

                        inProgressArr.forEach(function(gameEl) {
                            console.log(gameEl);
                            // console.log(gameEl.stadiumID); returns undefined even though it is present in the gameEl on line 218 (line above) and thus "if conditional" is not firing 
                            console.log(stadiumStID);
                            if (gameEl.stadiumID === stadiumStID) {
                                gameEl.stadiumName  = stadiumEl.Name,
                                gameEl.stadiumCity  = stadiumEl.City,
                                gameEl.stadiumState = stadiumEl.State 
                            };
                        });

                        scheduledArr.forEach(function(gameEl) {
                            console.log(gameEl);
                            console.log(gameEl.stadiumID);  
                            console.log(stadiumStID);
                            if (gameEl.stadiumID === stadiumStID) {
                                gameEl.stadiumName  = stadiumEl.Name,
                                gameEl.stadiumCity  = stadiumEl.City,
                                gameEl.stadiumState = stadiumEl.State 
                            };
                        });

                    });
                });

    });

        console.log(inProgressArr);
        console.log(scheduledArr);
        console.log(completedArr);

    
    // after returning the above data and subsequent data manipulation / configuration, we will need
    // to deconstructe the arrays and pass in each GameID into the BoxScore API for following... 
        // 1. In-Progress Data Points
            // a. InningDescription
            // b. HomeTeamRuns
            // c. AwayTeamRuns
            // d. Channel
        // 2. Scheduled Data Points 
            // a. DateTime
            // b. StadiumID ?? 
        // 3. Completed Data Points 
            // a. 




});



// set an attr on score-card of gameID? 