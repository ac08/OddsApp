$(document).ready(function() {
    // SportsData.io API - Endpoint URLs
    // let BettingFuturesMarketURL = "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST?key=fae190a3b3c447529f443fead4937d4c"
    
    
    // SportsData.io API - Ajax Call - Populate World Series Odds
    console.log('log');
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": BettingFuturesMarketURL,
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

});


// WorldSeries Odds selection works outside of forEach function
let listGroup = $('#worldSeriesWinnerListGroup');
console.log(listGroup);
let listItem = $("<li>");
listItem.text("Pirates");
listItem.addClass("list-group-item d-flex justify-content-between align-items-center");
let listItemSpan = $("<span>");
listItemSpan.text("200");
listItemSpan.addClass("badge badge-dark");
listGroup.append(listItem.append(listItemSpan));


// SportsData.io API - Ajax Call - Populate Pre-Game Odds
// SportsData.io API - Ajax Call - Populate Live Odds



