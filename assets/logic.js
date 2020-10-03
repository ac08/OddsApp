$(document).ready(function() {
// SportsData.io API Key 
// may want to have input button to enter API key on load? 
let sportDataApiKey         = "?key=fae190a3b3c447529f443fead4937d4c";

// SportsData.io API - Endpoint URLs
let bettingFuturesMarketURL = "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST?key=fae190a3b3c447529f443fead4937d4c"
// will need to dynamically generate the dates in the correct format
let gameDate                = "2020-10-02";
let boxScoreDate            = "2020-OCT-02";
let LiveGameOddsDate        = "2020-10-02";
let playerDate              = "2020-OCT-02";
let gamesOddsByDateURL      = "https://api.sportsdata.io/v3/mlb/odds/json/GameOddsByDate/" + gameDate + sportDataApiKey;
let boxScoresByDateURL      = "https://api.sportsdata.io/v3/mlb/stats/json/BoxScores/" + boxScoreDate + sportDataApiKey;
let teamsURL                = "https://api.sportsdata.io/v3/mlb/scores/json/teams" + sportDataApiKey;
let playerStatsByDate       = "https://api.sportsdata.io/v3/mlb/stats/json/PlayerGameStatsByDate/" + playerDate + sportDataApiKey
let stadiumURL              = "https://api.sportsdata.io/v3/mlb/scores/json/Stadiums" + sportDataApiKey;
let liveGameOddsURL         = "https://api.sportsdata.io/v3/mlb/odds/json/LiveGameOddsByDate/" + LiveGameOddsDate + sportDataApiKey;
let newsURL                 = "https://api.sportsdata.io/v3/mlb/scores/json/News" + sportDataApiKey;

let WSBettingMarketArr = [];
let worldSeriesOddsArr = [];
let ALBettingMarketArr = [];
let ALWinnerArr        = [];
let NLBettingMarketArr = [];
let NLWinnerArr        = [];

    // ajaxCall to bettingFuturesMarketURL to retrieve World Series 2020 Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response 
        let data = response[0];
        // Filter out all betting markets "World Series Winner"
        let bettingMarkets = data.BettingMarkets;
        bettingMarkets.forEach(function(bettingMarketEl) {
            if (bettingMarketEl.BettingBetType) {
                if (bettingMarketEl.BettingBetType === "World Series Winner") {
                    WSBettingMarketArr.push(bettingMarketEl);
                };
            } else return
        });

        // Name of Betting Market Type - Can be placed on #worldSeriesWinnerOdds
        if (WSBettingMarketArr[0]) {
            let WSWinner = WSBettingMarketArr[0].BettingBetType;
            $('#worldSeriesWinnerOdds').text(WSWinner);
        } else return

        // Configure Array for World Series Odds at DraftKings sportsbook (Id=7)
        let draftKingsWSOddsArr  = [];
        // Loop through Array for World Series Odds and push "line" to World Series Odds at DraftKings sportsbook Array (above)
        let tempArr = WSBettingMarketArr[0].BettingOutcomes;
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
        let listGroup = $("#worldSeriesWinnerOdds");
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
        listGroup.append(listItem, listItemSpan);
        });
    });

    // ajaxCall to bettingFuturesMarketURL to retrieve AL Winner Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response 
        let data = response[0];
        // Filter out all betting markets "AL Winner"
        let bettingMarkets = data.BettingMarkets;
        bettingMarkets.forEach(function(bettingMarketEl) {
            if (bettingMarketEl.BettingBetType) {
                if (bettingMarketEl.BettingBetType === "AL Winner") {
                    ALBettingMarketArr.push(bettingMarketEl);
                };
            } else return
        });

        // Name of Betting Market Type - Can be placed on #ALWinnerOdds
        if (ALBettingMarketArr[0]) {
            let ALWinner = ALBettingMarketArr[0].BettingBetType;
            $('#ALWinnerOdds').text(ALWinner);
        } else return

        // Configure Array for AL Winner Odds at DraftKings sportsbook (Id=7)
        let draftKingsAmLgOddsArr  = [];
        // Loop through Array for AL Winner Odds and push "line" to AL Winner Odds at DraftKings sportsbook Array (above)
        let tempArr = ALBettingMarketArr[0].BettingOutcomes;
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

    // ajaxCall to bettingFuturesMarketURL to retrieve NL Winner Odds by Team and append them dynamically to the page
    $.ajax({
        "url": bettingFuturesMarketURL,
        "method": "GET"
    }).done(function (response) {
        // Declare Data Response
        let data = response[0];
        // Filter out all betting markets "NL Winner"
        let bettingMarkets = data.BettingMarkets;
        bettingMarkets.forEach(function(bettingMarketEl) {
            if (bettingMarketEl.BettingBetType) {
                if (bettingMarketEl.BettingBetType === "NL Winner") {
                    NLBettingMarketArr.push(bettingMarketEl);
                };
            } else return
        });

        // Name of Betting Market Type - Can be placed on #NLWinnerOdds
        if (NLBettingMarketArr[0]) {
            let NLWinner = NLBettingMarketArr[0].BettingBetType;
            $('#NLWinnerOdds').text(NLWinner);
        } else return

        // Configure Array for NL Winner Odds at DraftKings sportsbook (Id=7)
        let draftKingsNtLgOddsArr = [];
        // Loop through Array for NL Winner Odds and push "line" to NL Winner Odds at DraftKings sportsbook Array (above)
        let tempArr = NLBettingMarketArr[0].BettingOutcomes;
        tempArr.forEach(function(tempEl) {
            let sportsBook = tempEl.SportsBook;
            if (sportsBook.SportsbookID === 7) {
                draftKingsNtLgOddsArr.push(tempEl);
            };
        });
        // Loop through Array for NL Winner Odds at DraftKings sportsbook and push teamName and odds to functional array
        draftKingsNtLgOddsArr.forEach(function(dkNtLgEl) {
            NLWinnerArr.push({
                teamName: dkNtLgEl.Participant,
                odds:     dkNtLgEl.PayoutAmerican
            });
        });

        // Dynamically generate National League Odds "Drop-Down Screen" - List Group
        NLWinnerArr.forEach(function(dkNtLgEl) {
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

    // create empty array to hold news objects (elements) from the SportsData.io newsURL endpoint
    let newsArr = [];
    // ajaxCall to Sportsdata.io newsURL endpoint to populate MLB news feed - scrollspy configured 
    $.ajax({
        "url": newsURL,
        "method": "GET"
    }).done(function (response) {
        // loop to push news objects to newsArr for the last five days
        for (i = 0; i < 5; i++) {
            newsArr.push({
                headline: response[i].Title,
                story:    response[i].Content,
                link:     response[i].Url
            });
        };
        console.log(newsArr);
        // Dynamically update News Feed - List Group
        newsArr.forEach(function(newsEl, i) {
            // generate ID to be used as a selector
            let contentID  = "#" + "content-" + [i];
            // select correct scrollspy item
            let contentEl  = $(contentID);
            // generate h5 tag
            let headlineEl = $("<h5>");
            // add classes to h5 tag
            headlineEl.addClass("text-secondary mb-1");
            // set h5 tag text to headline property in looping newsElement
            headlineEl.text(newsEl.headline);
            // insert h5 after contentEl 
            headlineEl.insertAfter(contentEl);
            // generate p tag
            let storyEl    = $("<p>");
            // set p tag text to story property in looping newsElement
            storyEl.text(newsEl.story);
            // insert p tag after headlineEl
            storyEl.insertAfter(headlineEl);
            // generate a tag
            let buttonEl   = $("<a>");
            // add classes to a tag
            buttonEl.addClass("btn btn-outline-dark btn-sm mb-3");
            // set a tag text 
            buttonEl.text("Continue");
            // set href attr of a tag to link property in looping newsElement
            buttonEl.attr("href", newsEl.link);
            // set role attr of a tag to "button" in looping newsElement
            buttonEl.attr("role", "button");
            // insert a tag after storyEl
            buttonEl.insertAfter(storyEl);
        });
    });

    let inProgressArr  = [];
    let scheduledArr   = [];
    let completedArr   = [];
    let unAvailableArr = [];

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
            } else if (gameEl.Status === "Scheduled") {
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
            } else if (gameEl.Status === "Postponed" || gameEl.Status === "Canceled" || gameEl.Status === "Suspended") {
                unAvailableArr.push({
                    gameID:              gameEl.GameId,
                    homeTeamName:        gameEl.HomeTeamName, 
                    awayTeamName:        gameEl.AwayTeamName
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
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl
                        };
                    });

                    scheduledArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl
                        };
                    });

                    completedArr.forEach(function(gameEl){
                        if (gameEl.homeTeamID === teamID) {
                            gameEl.homeTeamLogo = teamsEl.WikipediaWordMarkUrl
                        } else if (gameEl.awayTeamID === teamID) {
                            gameEl.awayTeamLogo = teamsEl.WikipediaWordMarkUrl
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

                                if (liveGameEl.Status === "InProgress") {
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
                                }
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

    function loadPreGameCards() {
        scheduledArr.forEach(function(gameEl) {
            let futuresMarketDiv  = $("#futuresMarket");
            let preGameCard       = $("<div>");                            // begin pre-game score card
            preGameCard.addClass("container-fluid border text-center my-4");
            console.log(gameEl.gameID);
            preGameCard.attr("id", gameEl.gameID);
            let preGameHomeRow    = $("<div>");                            // begin pre-game home row
            preGameHomeRow.addClass("row border");
            preGameCard.append(preGameHomeRow);
            let homeTeamLogo      = $("<img>")
            homeTeamLogo.addClass("col-1");
            homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                        .attr("id", "homeTeamLogo");
            let homeTeamName      = $("<div>");
            homeTeamName.addClass("col-4 border");
            console.log(gameEl.homeTeamName);
            homeTeamName.text(gameEl.homeTeamName);
            let gameTime          = $("<div>");
            gameTime.addClass("col-6 border");
            let preGameBtn        = $("<button>");
            preGameBtn.addClass("col-1 border")
                      .attr("data-toggle", "modal")
                      .attr("data-target", "#pre-game-modal");
            
            preGameCard.insertAfter(futuresMarketDiv);
            preGameHomeRow.append(homeTeamLogo, homeTeamName, gameTime, preGameBtn);

        });
    };

    loadPreGameCards();


    function loadLiveGameCards() {
        inProgressArr.forEach(function(gameEl) {
            let futuresMarketDiv  = $("#futuresMarket");
            let preGameCard       = $("<div>");                            // begin live score card
            preGameCard.addClass("container-fluid border text-center my-4");
            console.log(gameEl.gameID);
            preGameCard.attr("id", gameEl.gameID);
            let preGameHomeRow    = $("<div>");                            // begin live home row
            preGameHomeRow.addClass("row border");
            preGameCard.append(preGameHomeRow);
            let homeTeamLogo      = $("<img>")
            homeTeamLogo.addClass("col-1");
            homeTeamLogo.attr("src", gameEl.homeTeamLogo)
                        .attr("id", "homeTeamLogo");
            let homeTeamName      = $("<div>");
            homeTeamName.addClass("col-4 border");
            console.log(gameEl.homeTeamName);
            homeTeamName.text(gameEl.homeTeamName);
            let gameTime          = $("<div>");
            gameTime.addClass("col-6 border");
            let preGameBtn        = $("<button>");
            preGameBtn.addClass("col-1 border")
                      .attr("data-toggle", "modal")
                      .attr("data-target", "#pre-game-modal");
            
            preGameCard.insertAfter(futuresMarketDiv);
            preGameHomeRow.append(homeTeamLogo, homeTeamName, gameTime, preGameBtn);

        });
    };

    loadLiveGameCards();

});



// $("#loadGames").on("click", loadScoreCards);






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
