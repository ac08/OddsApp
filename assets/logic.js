$(document).ready(function() {
    // SportsData.io API Key 
    let sportDataApiKey = "?key=fae190a3b3c447529f443fead4937d4c";
    
    // SportsData.io API - Endpoint URLs
    let bettingFuturesMarketURL = "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST?key=fae190a3b3c447529f443fead4937d4c"
    // will need to dynamically generate the dates in the correct format
    let gameDate                = "2020-09-30";
    let boxScoreDate            = "2020-SEP-30";
    let LiveGameOddsDate        = "2020-09-30";
    let playerDate              = "2020-SEP-30";
    let gamesOddsByDateURL      = "https://api.sportsdata.io/v3/mlb/odds/json/GameOddsByDate/" + gameDate + sportDataApiKey;
    let boxScoresByDateURL      = "https://api.sportsdata.io/v3/mlb/stats/json/BoxScores/" + boxScoreDate + sportDataApiKey;
    let teamsURL                = "https://api.sportsdata.io/v3/mlb/scores/json/teams" + sportDataApiKey;
    let playerStatsByDate       = "https://api.sportsdata.io/v3/mlb/stats/json/PlayerGameStatsByDate/" + playerDate + sportDataApiKey
    let stadiumURL              = "https://api.sportsdata.io/v3/mlb/scores/json/Stadiums" + sportDataApiKey;
    let liveGameOddsURL         = "https://api.sportsdata.io/v3/mlb/odds/json/LiveGameOddsByDate/" + LiveGameOddsDate + sportDataApiKey;
    let newsURL                 = "https://api.sportsdata.io/v3/mlb/scores/json/News" + sportDataApiKey;
    
    // SportsData.io API - Ajax Call - Populate Futures Odds
    let worldSeriesOddsArr = [];
    let ALWinnerArr = [];
    let NLWinnerArr = [];

    // ajaxCall to bettingFuturesMarketURL to retrieve World Series 2020 Odss by Team and append them dynamically to the page
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
        let tempArr = data.BettingMarkets[11].BettingOutcomes;
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

        // Dynamically generate World Series Odds "Drop-Down Screen" - List Group
        worldSeriesOddsArr.forEach(function(worldSeriesOddsEl) {
        let teamName  = worldSeriesOddsEl.teamName;
        let WSodds    = worldSeriesOddsEl.odds;
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
        listItemSpan.text(WSodds); 
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });

    // ajaxCall to bettingFuturesMarketURL to retrieve AL Winner Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response 
        let data = response[0];
        // Name of Betting Market Type and As Of Date - Can be placed on #ALWinnerOdds
        let ALWinner     = data.BettingMarkets[15].BettingBetType;
        let ALWinnerTime = data.BettingMarkets[15].Updated;
        $("#ALWinnerOdds").text(ALWinner + " as of " + ALWinnerTime);

        // Configure Array for American League Odds at DraftKings sportsbook (Id=7)
        let draftKingsAmLgOddsArr  = [];
        // Loop through Array for American League Odds and push "line" to American League Odds at DraftKings sportsbook Array (above)
        let tempArr = data.BettingMarkets[15].BettingOutcomes;
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsAmLgOddsArr.push(tempEl);
            };
        });

        // Loop through Array for American League Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsAmLgOddsArr.forEach(function(dkAmLgEl) {
            ALWinnerArr.push({
                teamName: dkAmLgEl.Participant,
                odds:     dkAmLgEl.PayoutAmerican
            });
        });

        // Dynamically generate American League Odds "Drop-Down Screen" - List Group
        ALWinnerArr.forEach(function(AmLgOddsEl) {
        let teamName  = AmLgOddsEl.teamName;
        let ALodds    = AmLgOddsEl.odds;
        let listGroup = $("#ALWinnerOdds");
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
        listItemSpan.text(ALodds); 
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });

    // ajaxCall to bettingFuturesMarketURL to retrieve AL Winner Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response
        let data = response[0];
        // Name of Betting Market Type and As Of Date - Can be placed on #NLWinnerOdds
        let NLWinner     = data.BettingMarkets[14].BettingBetType;
        let NLWinnerTime = data.BettingMarkets[14].Updated;
        $('#NLWinnerOdds').text(NLWinner + " as of " + NLWinnerTime);
        // Configure Array for National League Odds at DraftKings sportsbook (Id=7)
        let draftKingsNtLgOddsArr  = [];
        // Loop through Array for National League Odds and push "line" to National League Odds at DraftKings sportsbook Array (above)
        let tempArr = data.BettingMarkets[14].BettingOutcomes;
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsNtLgOddsArr.push(tempEl);
            };
        });
        // Loop through Array for National League Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsNtLgOddsArr.forEach(function(dkNtLgEl) {
            NLWinnerArr.push({
                teamName: dkNtLgEl.Participant,
                odds:     dkNtLgEl.PayoutAmerican
            });
        });
        // Dynamically generate National League Odds "Drop-Down Screen" - List Group
        NLWinnerOddsArr.forEach(function(dkNtLgEl) {
        let teamName  = dkNtLgEl.teamName;
        let NLodds    = dkNtLgEl.odds;
        let listGroup = $("#NLWinnerOdds");
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
        listItemSpan.text(NLodds);
        // Append listItem to listGroup and listSpan to listItem
        listGroup.append(listItem.append(listItemSpan));
        });
    });

    let inProgressArr = [];
    let scheduledArr  = [];
    let completedArr  = [];

    // ajaxCall to gamesOddsByDateURL to sort games by game "status"; push in-progress games to global array inProgressArr, scheduled+ games to scheduledArr, and completed games to completedArr
    // when pushing game to specified array, it will carry a few properties that should be rendered on the page after final ajaxCall 
    $.ajax({
        "async": false,
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
            } else if (gameEl.Status === "Scheduled" || gameEl.Status === "Postponed" || gameEl.Status === "Canceled" || gameEl.Status === "Suspended" ) {
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
        "async": false,
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
                        gameEl.winningPitcherID = boxScoreEl.Game.WinningPitcherID,
                        gameEl.losingPitcherID  = boxScoreEl.Game.LosingPitcherID
                    };
                });
            });
        });
            // ajaxCall to teamsURL to GET Team logo link (svg) and add to either inProgressArr, scheduledArr, completedArr; match on homeTeamID and awayTeamID as defined in *Arr
            $.ajax({
                "async": false,
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
                    "async": false,
                    "url": stadiumURL,
                    "method": "GET"
                    }).done(function(response) {
                        response.forEach(function(stadiumEl) {
                            let stadiumStID = stadiumEl.StadiumID;

                            inProgressArr.forEach(function(gameEl) {
                                if (gameEl.stadiumID === stadiumStID) {
                                    gameEl.stadiumName  = stadiumEl.Name,
                                    gameEl.stadiumCity  = stadiumEl.City,
                                    gameEl.stadiumState = stadiumEl.State 
                                };
                            });

                            scheduledArr.forEach(function(gameEl) {

                                if (gameEl.stadiumID === stadiumStID) {
                                    gameEl.stadiumName  = stadiumEl.Name,
                                    gameEl.stadiumCity  = stadiumEl.City,
                                    gameEl.stadiumState = stadiumEl.State 
                                };
                            });

                        });
                    });

                    // ajaxCall to liveGameOddsURL to get Live Odds for the games that are inProgress (inProgressArr)
                    $.ajax({
                        "async": false,
                        "url": liveGameOddsURL,
                        "method": "GET"
                        }).done(function(response) {
                            response.forEach(function(liveGameEl) {
                                let liveGameGameID = liveGameEl.GameId;

                                inProgressArr.forEach(function(gameEl) {
                                    if (gameEl.gameID === liveGameGameID) {
                                        gameEl.liveHomeMoneyLine     = liveGameEl.LiveOdds[0].HomeMoneyLine,
                                        gameEl.liveAwayMoneyLine     = liveGameEl.LiveOdds[0].AwayMoneyLine,
                                        gameEl.homePointSpread       = liveGameEl.LiveOdds[0].HomePointSpread,
                                        gameEl.awayPointSpread       = liveGameEl.LiveOdds[0].AwayPointSpread,
                                        gameEl.homePointSpreadPayout = liveGameEl.LiveOdds[0].HomePointSpreadPayout,
                                        gameEl.awayPointSpreadPayout = liveGameEl.LiveOdds[0].AwayPointSpreadPayout
                                    };
                                });

                            });
                        });

                        // ajaxCall to playerStatsByDate to get pitcher name of winner&losing pitcher of completedArr 
                        $.ajax({
                            "async": false,
                            "url": playerStatsByDate,
                            "method": "GET"
                            }).done(function(response) {
                                response.forEach(function(playerEl) {
                                    let playerID = playerEl.PlayerID;
                                    
                                    completedArr.forEach(function(gameEl) {
                                        if (gameEl.winningPitcherID === playerID) {
                                            gameEl.winningPitcherName = playerEl.Name
                                        };
                                        if (gameEl.losingPitcherID === playerID) {
                                            gameEl.losingPitcherName = playerEl.Name
                                        };
                                    });
                                });
                            });
    });


    console.log(inProgressArr);
    console.log(scheduledArr);
    console.log(completedArr);


});



// set an attr on score-card of gameID? 



// 09-30-2020 Follow Ups
// Recheck Array Index on Futures Betting ajaxCalls - All 
// Dynamically change date variables needed for Endpoint URLs - Collin / Derek 
        // var date = moment().format("MMM Do YYYY, H:MM a");
        // $("#currentDay").append(date);
// "Complete Card" UI in bootstrap gridsystem - Nancy 
// UI and CSS work - Derek and Nancy 
// Modal = https://getbootstrap.com/docs/4.0/components/modal/ - All 
    // Live Game Modal 
    // Pre-Game Modal 
// News Feed and News Feed Card
    // https://api.sportsdata.io/v3/mlb/scores/json/News?key=fae190a3b3c447529f443fead4937d4c
