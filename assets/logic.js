$(document).ready(function() {
    // SportsData.io API 
    var settingsSportsData = {
    "async": true,
    "crossDomain": true,
    // "url": "https://api.sportsdata.io/v3/mlb/odds/json/BettingFuturesBySeason/2020POST?key=fae190a3b3c447529f443fead4937d4c",
    "method": "GET"
}

    // $.ajax(settingsSportsData).done(function (response) {
    console.log(response);
    // Name of Betting Market Type
    console.log(response[0].Name);
    // Response As of Date
    console.log(response[0].Updated);
    let data = response[0];
    console.log(data.Name);
    console.log(data.Updated);
    let worldSeriesOddsName = data.BettingMarkets[11].BettingBetType;
    console.log(worldSeriesOddsName);
    console.log(worldSeriesOddsName.Updated);
    let worldSeriesOdds = data.BettingMarkets[11].BettingOutcomes;
    console.log(worldSeriesOdds);
    let draftKingsWSOdds  = [];
    worldSeriesOdds.forEach(function(el) {
        let sportsBook = el.SportsBook;
        if (sportsBook.SportsbookID === 7) {
            draftKingsWSOdds.push(el);
        };
    });
    console.log(draftKingsWSOdds);
    draftKingsWSOdds.forEach(function (el) {
        console.log(el.Participant + ' ' + el.PayoutAmerican);
    })


    });


});


